import { Clinic, ClinicDocument, RateMdsHeaderCapturedText } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Buffer } from 'buffer';
import { Model } from 'mongoose';

@Injectable()
export class ClinicModelService {
    constructor(@InjectModel(Clinic.name) private clinicModel: Model<ClinicDocument>) {}

    async create(clinic: Partial<Clinic>): Promise<Clinic> {
        const createdClinic = new this.clinicModel(clinic);
        return createdClinic.save();
    }
    async findOneById(id: string): Promise<Clinic> {
        return await this.clinicModel.findOne({ id: id }).exec();
    }

    async updateOneById(id: string, update: Partial<Clinic>): Promise<Clinic | null> {
        return this.clinicModel.findOneAndUpdate({ id: id }, update, { new: true }).exec();
    }

    async deleteOneById(_id: string): Promise<Clinic | null> {
        return this.clinicModel.findOneAndDelete({ _id }).exec();
    }

    async findManyByUserId(userId: string): Promise<Clinic[]> {
        return this.clinicModel.find({ userId }).exec();
    }

    async addGoogleLink(clinicId: string, googleLink: string) {
        return this.clinicModel.findOneAndUpdate({ _id: clinicId }, { googleLink }, { new: true }).exec();
    }

    async addFacebookLink(clinicId: string, facebookLink: string) {
        return this.clinicModel.findOneAndUpdate({ _id: clinicId }, { facebookLink }, { new: true }).exec();
    }

    async addRateMdsLink(clinicId: string, rateMdsLink: string) {
        const clinic = await this.clinicModel.findOne({ _id: clinicId }).exec();
        return this.clinicModel
            .findOneAndUpdate(
                { _id: clinicId },
                { rateMdsLinks: clinic.rateMdsLinks.concat(rateMdsLink) },
                { new: true },
            )
            .exec();
    }

    async addRateMDsHeader(clinicId: string, originUrl: string, capturedText: any) {
        const clinic = await this.clinicModel.findOne({ _id: clinicId }).exec();

        console.log('clinic', clinic);
        console.log('originUrl', originUrl);
        console.log('capturedText', capturedText);

        const rateMdsHeader = {
            name: capturedText['Name'],
            typeOfDoctor: capturedText['Type of Doctor'],
            numberOfReviews: parseInt(capturedText['Number of Reviews']),
            currentRanking: parseInt(capturedText['Current Ranking']),
            rankingMax: parseInt(capturedText['Ranking Max']),
            rankingCategory: capturedText['Ranking Category'],
            rankingCategoryLink: capturedText['Ranking Category Link'],
            profileImage: capturedText['Profile Image'],
            clinicName: capturedText['Clinic Name'],
            clinicLink: capturedText['Clinic Link'],
            websiteLink: capturedText['Website Link'],
            provinceState: capturedText['Province State'],
            city: capturedText['City'],
        };

        const encodedOriginUrl = Buffer.from(originUrl).toString('base64');

        if (encodedOriginUrl in clinic.rateMdsHeaders) {
            // if there's already a header for this originUrl, check if the number of reviews has changed
            if (clinic.rateMdsHeaders[encodedOriginUrl].numberOfReviews !== rateMdsHeader.numberOfReviews) {
                await this.clinicModel
                    .findOneAndUpdate(
                        { _id: clinicId },
                        {
                            $set: {
                                [`rateMdsHeaders.${encodedOriginUrl}.numberOfReviews`]: rateMdsHeader.numberOfReviews,
                            },
                        },
                    )
                    .exec();

                return rateMdsHeader.numberOfReviews; // return the new number of reviews
            }
        }

        // if there's no header for this originUrl, add it
        await this.clinicModel
            .findOneAndUpdate(
                { _id: clinicId },
                {
                    $set: {
                        [`rateMdsHeaders.${encodedOriginUrl}`]: rateMdsHeader,
                    },
                },
                { new: true },
            )
            .exec();

        return rateMdsHeader.numberOfReviews;
    }
}

import { ReviewQueueProducerService } from '../bull/review-queue-producer.service';
import { AccountModelService } from '../mongo/account/account-model.service';
import { BrowseAiJob, BrowseAiJobDocument, ReviewDocument } from '@monorepo/type';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BrowseAiService {
    constructor(
        @InjectModel(BrowseAiJob.name) private browseAiJobModel: Model<BrowseAiJobDocument>,
        private readonly clinicModelService: AccountModelService,
        private readonly httpService: HttpService,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
    ) {}

    async startRobotJob(startRobotJobDto: {
        userId: string;
        accountId: string;
        robotUrl: string;
        inputParameters: object;
    }): Promise<any> {
        console.log(`starting robot job (service)`);
        console.log(startRobotJobDto.robotUrl);

        const response$ = this.httpService.post(
            startRobotJobDto.robotUrl,
            {
                inputParameters: startRobotJobDto.inputParameters,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.BROWSE_AI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        const response = await firstValueFrom(response$);
        if (response.status !== 200) {
            throw new Error(`Error running robot: ${response.data}`);
        } else {
            await this.browseAiJobModel.create({
                userId: startRobotJobDto.userId,
                accountId: startRobotJobDto.accountId,
                statusCode: response.data.statusCode,
                statusMessage: response.data.messageCode,
                result: response.data.result,
            });
        }
        console.log(`response from Browse AI (service - start robot job): ${response.data}`);
        return response.data;
    }

    async handleWebhookData(data: any): Promise<any> {
        console.log(`handling webhook data (service): ${data}`);

        const job = await this.browseAiJobModel.findOne({ 'result.id': data.task.id }).exec();
        if (data.event !== 'task.finishedSuccessfully') {
            throw new Error(`Webhook event ${data.event} not supported`);
        } else {
            const task = data.task;
            console.log(`task: ${task}`);
            if (!task) {
                throw new Error(`Webhook data does not contain a task`);
            } else {
                if (task.robotId === process.env.BROWSE_AI_RATE_MDS_HEADER_ROBOT_ID) {
                    const numberOfReviews = await this.clinicModelService.addRateMDsHeader(
                        job.accountId,
                        job.result.inputParameters.originUrl,
                        task.capturedTexts,
                    );

                    await this.startRobotJob({
                        userId: job.userId,
                        accountId: job.accountId,
                        robotUrl: process.env.BROWSE_AI_RATE_MDS_REVIEW_ROBOT,
                        inputParameters: {
                            originUrl: job.result.inputParameters.originUrl,
                            // dr_fix_review_list_ratemds_limit: 2,
                            dr_fix_review_list_ratemds_limit: numberOfReviews,
                        },
                    });
                } else if (task.robotId === process.env.BROWSE_AI_RATE_MDS_REVIEW_ROBOT_ID) {
                    const reviewListKey = 'Dr. Fix Review List RateMDs';

                    if (Object.prototype.hasOwnProperty.call(task.capturedLists, reviewListKey)) {
                        const reviewsArray = task.capturedLists[reviewListKey];

                        for (const review of reviewsArray) {
                            console.log(`review: ${review}`);

                            const convertedReview: Partial<ReviewDocument> = {
                                userId: job.userId,
                                accountId: job.accountId,
                                source: 'RateMDs',
                                staffRating: review['Staff Rating'],
                                punctualityRating: review['Punctuality Rating'],
                                helpfulnessRating: review['Helpfulness Rating'],
                                knowledgeRating: review['Knowledge Rating'],
                                reviewText: review['Review Text'],
                                reviewDate: review['Review Date'],
                                responseDate: review['Response Date'],
                                responseText: review['Response Text'],
                            };
                            await this.reviewQueueProducerService.addCreateRateMdsReviewJob(convertedReview);
                        }
                    }
                }
                return this.updateRobotJobWithWebhookData(data);
            }
        }
    }

    async updateRobotJobWithWebhookData(data: any): Promise<any> {
        const browseAiJob = await this.browseAiJobModel.findOne({ 'result.id': data.task.id }).exec();
        if (!browseAiJob) {
            throw new Error(`No Browse AI job found for task ID ${data.task.id}`);
        } else {
            browseAiJob.taskFromWebhook = data.task;
            browseAiJob.eventFromWebhook = data.event;
            return this.browseAiJobModel.findOneAndUpdate({ _id: browseAiJob._id }, browseAiJob, { new: true });
        }
    }
}

import { Mask, MaskDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.S3_REGION,
});

@Injectable()
export class MaskService {
    constructor(@InjectModel(Mask.name) private maskModel: Model<MaskDocument>) {}

    async createMask(maskName: string, maskLocation: string): Promise<Mask> {
        const newMask = new this.maskModel({ maskName, maskLocation });
        return newMask.save();
    }

    async uploadMasksFromDirectory(directoryPath: string): Promise<void> {
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileExtension = path.extname(file).toLowerCase();
            // Check if the file is an SVG or PNG before processing
            if (this.isFileSupported(fileExtension)) {
                const maskName = path.basename(file, fileExtension);
                const maskLocation = await this.uploadFileToS3(filePath, maskName, fileExtension);
                await this.createMask(maskName, maskLocation);
            }
        }
    }

    async findAllByNames(names: string[]): Promise<MaskDocument[]> {
        return await this.maskModel.find({ maskName: { $in: names } }).exec();
    }

    private isFileSupported(fileExtension: string): boolean {
        const supportedExtensions = ['.svg', '.png'];
        return supportedExtensions.includes(fileExtension);
    }

    private async uploadFileToS3(filePath: string, maskName: string, fileType: string): Promise<string> {
        const fileStream = fs.createReadStream(filePath);
        const contentType = fileType === '.svg' ? 'image/svg+xml' : 'image/png';
        const upload = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `masks/${maskName}${fileType}`,
            Body: fileStream,
            ContentType: contentType
        });
        try {
            await s3.send(upload);
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }

        return `${process.env.CF_DOMAIN}/masks/${maskName}${fileType}`;

    }
}

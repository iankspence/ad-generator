import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {
    BackgroundImage,
    BackgroundImageDocument,
    UploadBackgroundImageDto,
    UploadedFileInterface,
} from '@monorepo/type';
import { LoggerService } from '../../logger/logger.service';

const s3 = new S3Client({
    region: process.env.S3_REGION,
});

@Injectable()
export class BackgroundImageService {
    constructor(@InjectModel(BackgroundImage.name) private backgroundImageModel: Model<BackgroundImageDocument>,
                private readonly logger: LoggerService
    ) {
        this.logger.setContext('BackgroundImageService');
    }

    async getBackgroundImages(): Promise<BackgroundImageDocument[]> {
        return await this.backgroundImageModel.find().exec();
    }

    async uploadImage(file: UploadedFileInterface, uploadBackgroundImageDto: UploadBackgroundImageDto): Promise<void> {
        console.log("File object: ", file);

        const { accountId } = uploadBackgroundImageDto;
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (this.isFileSupported(fileExtension)) {
            const imageName = path.basename(file.originalname, fileExtension);
            const fullImageLocation = await this.uploadFileToS3(file.buffer, `background-images/full/${imageName}${fileExtension}`, fileExtension, true);
            this.logger.log(`Uploaded full image to S3: ${fullImageLocation} for account: ${accountId}`);
            const previewImageBuffer = await sharp(file.buffer)
                .resize({
                    height: 140,
                    fit: sharp.fit.inside,
                })
                .toBuffer();
            const previewImageLocation = await this.uploadFileToS3(previewImageBuffer, `background-images/preview/${imageName}${fileExtension}`, fileExtension, true);
            await this.createBackgroundImage(accountId, fullImageLocation, previewImageLocation);
            this.logger.log(`Uploaded preview image to S3: ${previewImageLocation} for account: ${accountId}`);
        }
    }

    async uploadImagesFromDirectory(directoryPath: string): Promise<void> {
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileExtension = path.extname(file).toLowerCase();
            if (this.isFileSupported(fileExtension)) {
                const imageName = path.basename(file, fileExtension);
                const fullImageLocation = await this.uploadFileToS3(filePath, `background-images/full/${imageName}${fileExtension}`, fileExtension);

                const previewImageBuffer = await sharp(filePath)
                    .resize({
                        height: 140,
                        fit: sharp.fit.inside,
                    })
                    .toBuffer();
                const previewImageLocation = await this.uploadFileToS3(previewImageBuffer, `background-images/preview/${imageName}${fileExtension}`, fileExtension, true);
                await this.createBackgroundImage(`${imageName}`, fullImageLocation, previewImageLocation);
            }
        }
    }

    async createBackgroundImage(backgroundImageName: string, backgroundImageLocation: string, backgroundImagePreviewLocation: string): Promise<BackgroundImage> {
        const newImage = new this.backgroundImageModel({ backgroundImageName, backgroundImageLocation, backgroundImagePreviewLocation });
        return newImage.save();
    }

    private isFileSupported(fileExtension: string): boolean {
        const supportedExtensions = ['.png', '.jpg'];
        return supportedExtensions.includes(fileExtension);
    }

    private async uploadFileToS3(file: string | Buffer, key: string, fileType: string, isBuffer = false): Promise<string> {
        const fileStream = isBuffer ? file : fs.createReadStream(file);
        const contentType = fileType === '.jpg' ? 'image/jpeg' : 'image/png';
        const upload = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: fileStream,
            ContentType: contentType
        });
        try {
            await s3.send(upload);
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }

        return key;
    }
}

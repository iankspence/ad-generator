import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { BackgroundImage, BackgroundImageDocument } from '@monorepo/type';

const s3 = new S3Client({
    region: process.env.S3_REGION,
});

@Injectable()
export class BackgroundImageService {
    constructor(@InjectModel(BackgroundImage.name) private backgroundImageModel: Model<BackgroundImageDocument>) {}

    async createBackgroundImage(backgroundImageName: string, backgroundImageLocation: string): Promise<BackgroundImage> {
        const newImage = new this.backgroundImageModel({ backgroundImageName, backgroundImageLocation });
        return newImage.save();
    }

    async uploadImagesFromDirectory(directoryPath: string): Promise<void> {
        const files = fs.readdirSync(directoryPath);

        console.log('files', files);

        for (const file of files) {
            if (file === '.DS_Store') {
                continue;
            }
            const filePath = path.join(directoryPath, file);
            const fileExtension = path.extname(file).toLowerCase();
            if (this.isFileSupported(fileExtension)) {
                const imageName = path.basename(file, fileExtension);
                const imageLocation = await this.uploadFileToS3(filePath, imageName, fileExtension);

                console.log('imageName', imageName);
                console.log('imageLocation', imageLocation);

                await this.createBackgroundImage(imageName, imageLocation);
            }
        }
    }

    async findAllByNames(names: string[]): Promise<BackgroundImageDocument[]> {
        return await this.backgroundImageModel.find({ backgroundImageName: { $in: names } }).exec();
    }

    private isFileSupported(fileExtension: string): boolean {
        const supportedExtensions = ['.png', '.jpg'];
        return supportedExtensions.includes(fileExtension);
    }

    private async uploadFileToS3(filePath: string, imageName: string, fileType: string): Promise<string> {
        const fileStream = fs.createReadStream(filePath);
        const contentType = fileType === '.jpg' ? 'image/jpeg' : 'image/png';
        const upload = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `background-images/${imageName}${fileType}`,
            Body: fileStream,
            ContentType: contentType
        });
        try {
            await s3.send(upload);
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }

        return `${process.env.CLOUDFRONT_URL}/background-images/${imageName}${fileType}`;
    }
}

import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'streamifier';

const s3 = new S3Client({
    region: 'us-east-2',
});

@Injectable()
export class S3Service {
    async saveCanvas(canvasName: string, dataUrl: string) {
        const base64Data = new Buffer(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        let orderedCanvasName;
        switch (canvasName) {
            case 'hook':
                orderedCanvasName = `01-${canvasName}`
                break;
            case 'claim':
                orderedCanvasName = `02-${canvasName}`
                break;
            case 'review':
                orderedCanvasName = `03-${canvasName}`
                break;
            case 'close':
                orderedCanvasName = `04-${canvasName}`
                break;
            default:
                orderedCanvasName = canvasName;
        }

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${orderedCanvasName}.png`,
            Body: createReadStream(base64Data),
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        };

        try {
            const result = await s3.send(new PutObjectCommand(params));
            return result;
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }
    }
}

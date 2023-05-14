import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {AccountDocument} from "@monorepo/type";

const s3 = new S3Client({
    region: 'us-east-2',
});

@Injectable()
export class S3Service {
    async saveCanvas(canvases: Array<{canvasName: string, dataUrl: string}>, account: AccountDocument) {
        const folderName = `${account.country}/${account.provinceState}/${account.city}/${account.companyName}`
        const results = [];

        for (const {canvasName, dataUrl} of canvases) {
            const base64Data = Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');

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

            const key = `${folderName}/${orderedCanvasName}.png`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: base64Data,
                ContentType: 'image/png'
            };

            try {
                const result = await s3.send(new PutObjectCommand(params));
                results.push(result);
            } catch (error) {
                console.error('Error uploading to S3:', error);
                throw error;
            }
        }

        return results;
    }
}

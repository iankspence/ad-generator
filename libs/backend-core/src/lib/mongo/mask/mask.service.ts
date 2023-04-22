import { Mask, MaskDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { extname } from 'path';

@Injectable()
export class MaskService {
    constructor(@InjectModel(Mask.name) private maskModel: Model<MaskDocument>) {}

    async createMask(maskName: string, maskBase64: string): Promise<Mask> {
        const newMask = new this.maskModel({ maskName, maskBase64 });
        return newMask.save();
    }

    async uploadMasksFromDirectory(directoryPath: string): Promise<void> {
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const maskName = path.basename(file, path.extname(file));

            const maskBase64 = await this.imageToBase64(filePath);
            await this.createMask(maskName, maskBase64);
        }
    }

    async findAllByNames(names: string[]): Promise<MaskDocument[]> {
        return await this.maskModel.find({ maskName: { $in: names } }).exec();
    }

    async imageToBase64(filepath: string): Promise<string> {
        const binaryData = await fs.promises.readFile(filepath);
        const mimeType = this.getMimeType(extname(filepath));
        return `data:${mimeType};base64,${binaryData.toString('base64')}`;
    }

    getMimeType(extension: string): string {
        const mimeTypes: { [key: string]: string } = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
        };

        return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
    }
}

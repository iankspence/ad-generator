import { Mask, MaskDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';

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

    private async imageToBase64(filepath: string): Promise<string> {
        const binaryData = await fs.promises.readFile(filepath);
        return binaryData.toString('base64');
    }
}

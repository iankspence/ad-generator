import { Close, CloseDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CloseService {
    constructor(@InjectModel(Close.name) private readonly closeModel: Model<CloseDocument>) {}

    async findClosesByAccountId(accountId: string): Promise<CloseDocument[]> {
        return this.closeModel.find({ accountId: accountId }).exec();
    }

    async updateTextEdit(close: Partial<CloseDocument>): Promise<CloseDocument> {
        return this.closeModel.findOneAndUpdate({ _id: close._id }, { closeTextEdited: close.closeTextEdited }, { new: true });
    }
}

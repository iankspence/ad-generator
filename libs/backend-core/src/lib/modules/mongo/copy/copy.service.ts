import { Copy, CopyDocument} from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CopyService {
    constructor(@InjectModel(Copy.name) private readonly copyModel: Model<CopyDocument>) {}

    async findCopiesByAccountId(accountId: string): Promise<CopyDocument[]> {
        return this.copyModel.find({ accountId }).exec();
    }

    async updateTextEdit(copy: Partial<CopyDocument>): Promise<CopyDocument> {
        return this.copyModel.findOneAndUpdate({ _id: copy._id }, { copyTextEdited: copy.copyTextEdited }, { new: true });
    }

}

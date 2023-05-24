import { PdfService } from './pdf.service';
import { Module } from '@nestjs/common';
import { AdModule } from '../mongo/ad/ad.module';
import { AccountModule } from '../mongo/account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdSet, AdSetSchema } from '@monorepo/type';

@Module({
    imports: [AdModule, AccountModule, MongooseModule.forFeature([{ name: AdSet.name, schema: AdSetSchema }]),],
    providers: [PdfService],
    exports: [PdfService],
})
export class PdfModule {}

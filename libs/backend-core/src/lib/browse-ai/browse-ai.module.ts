import { AccountModule } from '../mongo/account/account.module';
import { ReviewModule } from '../mongo/review/review.module';
import { BrowseAiController } from './browse-ai.controller';
import { BrowseAiService } from './browse-ai.service';
import { BrowseAiJob, BrowseAiJobSchema } from '@monorepo/type';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: BrowseAiJob.name, schema: BrowseAiJobSchema }]),
        HttpModule,
        ReviewModule,
        AccountModule,
    ],
    controllers: [BrowseAiController],
    providers: [BrowseAiService],
})
export class BrowseAiModule {}

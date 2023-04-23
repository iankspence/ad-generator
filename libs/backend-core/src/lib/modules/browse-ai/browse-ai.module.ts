import { BullConfigModule } from '../bull/bull.module';
import { AccountModule } from '../mongo/account/account.module';
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
        BullConfigModule,
        AccountModule,
    ],
    controllers: [BrowseAiController],
    providers: [BrowseAiService],
})
export class BrowseAiModule {}

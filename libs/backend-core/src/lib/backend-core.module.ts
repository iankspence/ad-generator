import { BrowseAiModule } from './browse-ai/browse-ai.module';
import { BullConfigModule } from './bull/bull.module';
import { MongoModule } from './mongo/mongo.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { OutscraperModule } from './outscraper/outscraper.module';
import { S3Module } from './s3/s3.module';
import { WebsocketModule } from './websocket/websocket.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [OpenAiModule, S3Module, MongoModule, BrowseAiModule, OutscraperModule, BullConfigModule, WebsocketModule],
    exports: [OpenAiModule, S3Module, MongoModule],
})
export class BackendCoreModule {}

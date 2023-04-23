import { BrowseAiModule } from './modules/browse-ai/browse-ai.module';
import { BullConfigModule } from './modules/bull/bull.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { OpenAiModule } from './modules/open-ai/open-ai.module';
import { OutscraperModule } from './modules/outscraper/outscraper.module';
import { S3Module } from './modules/s3/s3.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [OpenAiModule, S3Module, MongoModule, BrowseAiModule, OutscraperModule, BullConfigModule, WebsocketModule],
    exports: [OpenAiModule, S3Module, MongoModule],
})
export class BackendCoreModule {}

import { BrowseAiModule } from './modules/browse-ai/browse-ai.module';
import { BullConfigModule } from './modules/bull/bull.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { OpenAiModule } from './modules/open-ai/open-ai.module';
import { OutscraperModule } from './modules/outscraper/outscraper.module';
import { CardModule } from './modules/mongo/card/card.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [OpenAiModule, CardModule, MongoModule, BrowseAiModule, OutscraperModule, BullConfigModule, WebsocketModule],
    exports: [OpenAiModule, CardModule, MongoModule],
})
export class BackendCoreModule {}

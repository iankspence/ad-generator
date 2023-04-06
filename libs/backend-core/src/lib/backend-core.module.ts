import { BrowseAiModule } from './browse-ai/browse-ai.module';
import { MongoModule } from './mongo/mongo.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { S3Module } from './s3/s3.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [OpenAiModule, S3Module, MongoModule, BrowseAiModule],
    exports: [OpenAiModule, S3Module, MongoModule],
})
export class BackendCoreModule {}

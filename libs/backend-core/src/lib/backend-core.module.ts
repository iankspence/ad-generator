import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { S3Module } from './s3/s3.module';

@Module({
    imports: [OpenAiModule, S3Module, MongoModule],
    exports: [OpenAiModule, S3Module, MongoModule],
})
export class BackendCoreModule { }

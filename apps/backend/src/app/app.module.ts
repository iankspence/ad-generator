import { Module } from '@nestjs/common';
import { BackendCoreModule } from '@monorepo/backend-core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        BackendCoreModule,
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
        }),
    ],
})
export class AppModule { }

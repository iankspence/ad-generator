/* eslint-disable @typescript-eslint/no-var-requires */
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as process from 'process';

if (process.env.CONFIG_ENV === 'local') {
    require('dotenv').config({ path: './apps/backend/src/environments/.env.local.public' });
    require('dotenv').config({ path: './apps/backend/src/environments/.env.local.secret' });
} else if (process.env.CONFIG_ENV === 'dev') {
    require('dotenv').config({ path: './apps/backend/src/environments/.env.local.public' });
    require('dotenv').config({ path: './apps/backend/src/environments/.env.local.secret' });
} else if (process.env.CONFIG_ENV === 'staging') {
    require('dotenv').config({ path: './apps/backend/src/environments/.env.staging.public' });
    require('dotenv').config({ path: './apps/backend/src/environments/.env.staging.secret' });
} else if (process.env.CONFIG_ENV === 'prod') {
    require('dotenv').config({ path: './apps/backend/src/environments/.env.prod.public' });
    require('dotenv').config({ path: './apps/backend/src/environments/.env.prod.secret' });
}

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.FRONTEND_URI,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.use(cookieParser());

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    // Add the body-parser middleware with increased payload size limit
    app.use(bodyParser.json({ limit: '50mb' }));

    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: ${process.env.BACKEND_URI}/${globalPrefix}`);
}

bootstrap();

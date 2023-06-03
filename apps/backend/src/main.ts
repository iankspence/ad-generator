/* eslint-disable @typescript-eslint/no-var-requires */
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as process from 'process';

if (process.env.CONFIG_ENV === 'local') {
    require('dotenv').config({ path: './apps/backend/.env.local.public' });
    require('dotenv').config({ path: './apps/backend/.env.local.secret' });
} else if (process.env.CONFIG_ENV === 'dev') {
    require('dotenv').config({ path: './apps/backend/.env.dev.public' });
    require('dotenv').config({ path: './apps/backend/.env.dev.secret' });
} else if (process.env.CONFIG_ENV === 'staging') {
    require('dotenv').config({ path: './apps/backend/.env.staging.public' });
    require('dotenv').config({ path: './apps/backend/.env.staging.secret' });
} else if (process.env.CONFIG_ENV === 'prod') {
    require('dotenv').config({ path: './apps/backend/.env.prod.public' });
    require('dotenv').config({ path: './apps/backend/.env.prod.secret' });
}

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    console.log('process.env.FRONTEND_URI (main): ', process.env.FRONTEND_URI)
    console.log('process.env.BACKEND_URI (main): ', process.env.BACKEND_URI)
    console.log('MONGODB_URI (main): ', process.env.MONGODB_URI.substring(0, 10))
    console.log('process.env.CONFIG_ENV (main): ', process.env.CONFIG_ENV)

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
    Logger.log(`🚀 Application is running on ${process.env.BACKEND_URI}/${globalPrefix}`);
}

bootstrap();

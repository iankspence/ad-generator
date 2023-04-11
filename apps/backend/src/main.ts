import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    // Add the body-parser middleware with increased payload size limit
    app.use(bodyParser.json({ limit: '50mb' }));

    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

import { ReviewGateway } from './review.gateway';
import { Module } from '@nestjs/common';

@Module({
    providers: [ReviewGateway],
    exports: [ReviewGateway],
})
export class WebsocketModule {}

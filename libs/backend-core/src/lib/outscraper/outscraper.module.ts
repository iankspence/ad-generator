import { MongoModule } from '../mongo/mongo.module';
import { OutscraperController } from './outscraper.controller';
import { OutscraperService } from './outscraper.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [MongoModule],
    controllers: [OutscraperController],
    providers: [OutscraperService],
})
export class OutscraperModule {}

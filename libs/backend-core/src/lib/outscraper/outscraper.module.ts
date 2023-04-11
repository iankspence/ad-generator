import { ReviewModule } from '../mongo/review/review.module';
import { OutscraperController } from './outscraper.controller';
import { OutscraperService } from './outscraper.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [ReviewModule],
    controllers: [OutscraperController],
    providers: [OutscraperService],
})
export class OutscraperModule {}

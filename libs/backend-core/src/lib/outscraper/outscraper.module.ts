import { BullConfigModule } from '../bull/bull.module';
import { OutscraperController } from './outscraper.controller';
import { OutscraperService } from './outscraper.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [BullConfigModule],
    controllers: [OutscraperController],
    providers: [OutscraperService],
})
export class OutscraperModule {}

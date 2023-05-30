import { BrowseAiService } from './browse-ai.service';
import { Controller, Post, Body } from '@nestjs/common';
import { BrowseAiJobDocument, IncomingWebhookDataDto, StartRobotJobDto } from '@monorepo/type';

@Controller('browse-ai')
export class BrowseAiController {
    constructor(private readonly browseAiService: BrowseAiService) {}
    @Post('webhook')
    handleWebhookData(@Body() incomingWebhookData: IncomingWebhookDataDto): Promise<BrowseAiJobDocument> {
        console.log(`handling webhook data (controller)`);
        return this.browseAiService.handleWebhookData(incomingWebhookData);
    }

    @Post('start-robot-job')
    async runRateMdsHeaderRobot(@Body() startRobotJobDto: StartRobotJobDto,): Promise<BrowseAiJobDocument> {
        console.log(`handling start-robot-job data (controller)`);
        return await this.browseAiService.startRobotJob(startRobotJobDto);
    }
}

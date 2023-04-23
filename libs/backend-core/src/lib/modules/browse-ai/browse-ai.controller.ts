import { BrowseAiService } from './browse-ai.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('browse-ai')
export class BrowseAiController {
    constructor(private readonly browseAiService: BrowseAiService) {}
    @Post('webhook')
    handleWebhookData(@Body() data: any): Promise<any> {
        console.log(`handling webhook data (controller)`);
        return this.browseAiService.handleWebhookData(data);
    }
    @Post('start-robot-job')
    async runRateMdsHeaderRobot(
        @Body()
        startRobotJobDto: {
            userId: string;
            accountId: string;
            robotUrl: string;
            inputParameters: { originUrl: string };
        },
    ): Promise<any> {
        console.log(`handling start-robot-job data (controller)`);
        return await this.browseAiService.startRobotJob(startRobotJobDto);
    }
}
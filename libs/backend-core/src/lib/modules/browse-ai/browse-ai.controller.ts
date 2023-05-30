import { BrowseAiService } from './browse-ai.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BrowseAiJobDocument, IncomingWebhookDataDto, StartRobotJobDto } from '@monorepo/type';
import { Public } from '../auth/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('browse-ai')
export class BrowseAiController {
    constructor(private readonly browseAiService: BrowseAiService) {}

    @Public()
    @Post('webhook')
    handleWebhookData(@Body() incomingWebhookData: IncomingWebhookDataDto): Promise<BrowseAiJobDocument> {
        return this.browseAiService.handleWebhookData(incomingWebhookData);
    }

    @UseGuards(JwtAuthGuard)
    @Roles('admin', 'content-manager')
    @Post('start-robot-job')
    async runRateMdsHeaderRobot(@Body() startRobotJobDto: StartRobotJobDto,): Promise<BrowseAiJobDocument> {
        return await this.browseAiService.startRobotJob(startRobotJobDto);
    }
}

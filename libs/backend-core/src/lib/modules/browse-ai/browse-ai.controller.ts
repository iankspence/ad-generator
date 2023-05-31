import { BrowseAiService } from './browse-ai.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BrowseAiJobDocument, IncomingWebhookDataDto, StartRobotJobDto } from '@monorepo/type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('browse-ai')
export class BrowseAiController {
    constructor(private readonly browseAiService: BrowseAiService) {}

    @Post('webhook')
    handleWebhookData(@Body() incomingWebhookData: IncomingWebhookDataDto): Promise<BrowseAiJobDocument> {
        return this.browseAiService.handleWebhookData(incomingWebhookData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('start-robot-job')
    async runRateMdsHeaderRobot(@Body() startRobotJobDto: StartRobotJobDto,): Promise<BrowseAiJobDocument> {
        return await this.browseAiService.startRobotJob(startRobotJobDto);
    }
}

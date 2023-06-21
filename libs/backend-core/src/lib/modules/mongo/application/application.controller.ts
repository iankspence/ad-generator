import { Body, Controller, Post } from '@nestjs/common';
import { CreateApplicationDto } from '@monorepo/type';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Post('create')
    create(@Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationService.create(createApplicationDto);
    }
}

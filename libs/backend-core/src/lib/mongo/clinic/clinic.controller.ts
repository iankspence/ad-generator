import { ClinicModelService } from './clinic-model.service';
import { Clinic } from '@monorepo/type';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Patch } from '@nestjs/common';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicModelService: ClinicModelService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() clinic: Partial<Clinic>): Promise<Clinic> {
        return this.clinicModelService.create(clinic);
    }
    @Get(':_id')
    async findOne(@Param('_id') _id: string): Promise<Clinic> {
        return await this.clinicModelService.findOneById(_id);
    }

    @Put(':_id')
    async updateOneById(@Param('_id') _id: string, @Body() update: Partial<Clinic>): Promise<Clinic> {
        return this.clinicModelService.updateOneById(_id, update);
    }

    @Delete(':_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('_id') _id: string): Promise<void> {
        await this.clinicModelService.deleteOneById(_id);
    }

    @Get('user/:userId')
    async findManyByUserId(@Param('userId') userId: string): Promise<Clinic[]> {
        return await this.clinicModelService.findManyByUserId(userId);
    }

    @Patch('google-link')
    async addGoogleLink(@Body() dto: { clinicId: string; googleLink: string }) {
        return await this.clinicModelService.addGoogleLink(dto.clinicId, dto.googleLink);
    }

    @Patch('facebook-link')
    async addFacebookLink(@Body() dto: { clinicId: string; facebookLink: string }) {
        return await this.clinicModelService.addFacebookLink(dto.clinicId, dto.facebookLink);
    }

    @Patch('rate-mds-links')
    async addRateMdsLink(@Body() dto: { clinicId: string; rateMdsLink: string }) {
        return await this.clinicModelService.addRateMdsLink(dto.clinicId, dto.rateMdsLink);
    }

    // @Post(':clinicId/rateMDsLink')
    // async addRateMDsLink(@Param('clinicId') clinicId: string, @Body('rateMDsLink') rateMDsLink: string) {
    //     return await this.clinicService.addRateMDsLink(clinicId, rateMDsLink);
    // }
}

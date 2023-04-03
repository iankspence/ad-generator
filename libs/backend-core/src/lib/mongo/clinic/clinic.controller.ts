import { ClinicModelService } from './clinic-model.service';
import { Clinic } from '@monorepo/type';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';

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

    @Get()
    async findAll(): Promise<Clinic[]> {
        return this.clinicModelService.findAll();
    }
}

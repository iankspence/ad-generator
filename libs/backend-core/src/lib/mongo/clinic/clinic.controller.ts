import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { ClinicModelService } from './clinic-model.service';
import { Clinic } from './clinic.schema';
import uniqid from 'uniqid';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicModelService: ClinicModelService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() clinic: Partial<Clinic>): Promise<Clinic> {
        clinic.id = uniqid('clinic_')
        return this.clinicModelService.create(clinic);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Clinic> {
        return await this.clinicModelService.findOneById(id);
    }

    @Put(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() update: Partial<Clinic>,
    ): Promise<Clinic> {
        return this.clinicModelService.updateOneById(id, update);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('id') id: string): Promise<void> {
        await this.clinicModelService.deleteOneById(id);
    }

    @Get()
    async findAll(): Promise<Clinic[]> {
        return this.clinicModelService.findAll();
    }
}

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
import { AdSetModelService } from './ad-set-model.service';
import { AdSet } from './ad-set.schema';
import uniqid from 'uniqid';

@Controller('ad-set')
export class AdSetController {
    constructor(private readonly adSetModelService: AdSetModelService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() adSet: Partial<AdSet>): Promise<AdSet> {
        adSet.id = uniqid('adset_')
        return this.adSetModelService.create(adSet);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AdSet> {
        return await this.adSetModelService.findOneById(id);
    }

    @Put(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() update: Partial<AdSet>,
    ): Promise<AdSet> {
        return this.adSetModelService.updateOneById(id, update);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('id') id: string): Promise<void> {
        await this.adSetModelService.deleteOneById(id);
    }

    @Get()
    async findAll(): Promise<AdSet[]> {
        return this.adSetModelService.findAll();
    }

    @Get('clinicId/:clinicId')
    async findAllByClinicId(@Param('clinicId') clinicId: string): Promise<AdSet[]> {
        return await this.adSetModelService.findAllByClinicId(clinicId);
    }
}

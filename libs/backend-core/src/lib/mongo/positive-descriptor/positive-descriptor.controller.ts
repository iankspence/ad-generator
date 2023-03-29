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
import { PositiveDescriptorModelService } from './positive-descriptor-model.service';
import { PositiveDescriptor } from './positive-descriptor.schema';

@Controller('positive-descriptor')
export class PositiveDescriptorController {
    constructor(private readonly positiveDescriptorModelService: PositiveDescriptorModelService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() positiveDescriptor: Partial<PositiveDescriptor>): Promise<PositiveDescriptor> {
        return this.positiveDescriptorModelService.create(positiveDescriptor);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PositiveDescriptor> {
        return await this.positiveDescriptorModelService.findOneById(id);
    }

    @Put(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() update: Partial<PositiveDescriptor>,
    ): Promise<PositiveDescriptor> {
        return this.positiveDescriptorModelService.updateOneById(id, update);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('id') id: string): Promise<void> {
        await this.positiveDescriptorModelService.deleteOneById(id);
    }

    @Get()
    async findAll(): Promise<PositiveDescriptor[]> {
        return this.positiveDescriptorModelService.findAll();
    }

    @Get('clinicId/:clinicId')
    async findAllByClinicId(@Param('clinicId') clinicId: string): Promise<PositiveDescriptor[]> {
        return await this.positiveDescriptorModelService.findAllByClinicId(clinicId);
    }

    @Get('reviewId/:reviewId')
    async findAllByReviewId(@Param('reviewId') reviewId: string): Promise<PositiveDescriptor[]> {
        return await this.positiveDescriptorModelService.findAllByReviewId(reviewId);
    }
}

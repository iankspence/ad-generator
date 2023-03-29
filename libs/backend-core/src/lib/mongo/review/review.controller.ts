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
import { ReviewModelService } from './review-model.service';
import { Review } from './review.schema';
import { PositiveDescriptor, Claim } from '@monorepo/type';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewModelService: ReviewModelService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() review: Partial<Review>): Promise<[Review, PositiveDescriptor, Claim[]]> {
        return this.reviewModelService.create(review);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Review> {
        return await this.reviewModelService.findOneById(id);
    }

    @Put(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() update: Partial<Review>,
    ): Promise<Review> {
        return this.reviewModelService.updateOneById(id, update);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('id') id: string): Promise<void> {
        await this.reviewModelService.deleteOneById(id);
    }

    @Get()
    async findAll(): Promise<Review[]> {
        return this.reviewModelService.findAll();
    }

    @Get('clinicId/:clinicId')
    async findAllByClinicId(@Param('clinicId') clinicId: string): Promise<Review[]> {
        return await this.reviewModelService.findAllByClinicId(clinicId);
    }
}

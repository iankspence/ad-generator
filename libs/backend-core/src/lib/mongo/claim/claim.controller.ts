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
import { ClaimModelService } from './claim-model.service';
import { Claim } from './claim.schema';

@Controller('claim')
export class ClaimController {
    constructor(private readonly claimModelService: ClaimModelService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() claim: Partial<Claim>): Promise<Claim> {
        return this.claimModelService.create(claim);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createMany(@Body() claims: Partial<Claim[]>): Promise<Claim[]> {
        return this.claimModelService.createMany(claims);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Claim> {
        return await this.claimModelService.findOneById(id);
    }

    @Put(':id')
    async updateOneById(
        @Param('id') id: string,
        @Body() update: Partial<Claim>,
    ): Promise<Claim> {
        return this.claimModelService.updateOneById(id, update);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('id') id: string): Promise<void> {
        await this.claimModelService.deleteOneById(id);
    }

    @Get()
    async findAll(): Promise<Claim[]> {
        return this.claimModelService.findAll();
    }

    @Get('clinicId/:clinicId')
    async findAllByClinicId(@Param('clinicId') clinicId: string): Promise<Claim[]> {
        return await this.claimModelService.findAllByClinicId(clinicId);
    }

    @Get('reviewId/:reviewId')
    async findAllByReviewId(@Param('reviewId') reviewId: string): Promise<Claim[]> {
        return await this.claimModelService.findAllByReviewId(reviewId);
    }

    @Get('positiveDescriptorId/:positiveDescriptorId')
    async findAllByPositiveDescriptorId(@Param('positiveDescriptorId') positiveDescriptorId: string): Promise<Claim[]> {
        return await this.claimModelService.findAllByPositiveDescriptorId(positiveDescriptorId);
    }
}

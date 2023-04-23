import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { Claim, ClaimSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }])],
    controllers: [ClaimController],
    providers: [ClaimService],
})
export class ClaimModule {}

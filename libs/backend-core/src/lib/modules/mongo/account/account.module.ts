import { ClaimModule } from '../claim/claim.module';
import { CloseModule } from '../close/close.module';
import { CopyModule } from '../copy/copy.module';
import { HookModule } from '../hook/hook.module';
import { ReviewModule } from '../review/review.module';
import { AccountModelService } from './account-model.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        ReviewModule,
        HookModule,
        CopyModule,
        ClaimModule,
        CloseModule,
    ],
    controllers: [AccountController],
    providers: [AccountModelService],
    exports: [AccountModelService],
})
export class AccountModule {}

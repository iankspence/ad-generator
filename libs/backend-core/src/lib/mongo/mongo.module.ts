import { AccountModule } from './account/account.module';
import { ClaimModule } from './claim/claim.module';
import { CloseModule } from './close/close.module';
import { CopyModule } from './copy/copy.module';
import { HookModule } from './hook/hook.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [UserModule, AccountModule, ReviewModule, ClaimModule, CopyModule, HookModule, CloseModule],
})
export class MongoModule {}

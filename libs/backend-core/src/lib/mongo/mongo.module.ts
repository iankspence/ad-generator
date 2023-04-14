import { AccountModule } from './account/account.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [UserModule, AccountModule, ReviewModule],
})
export class MongoModule {}

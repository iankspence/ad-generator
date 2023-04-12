import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [UserModule, AccountModule],
})
export class MongoModule {}

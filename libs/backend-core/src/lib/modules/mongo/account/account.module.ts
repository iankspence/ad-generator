import { AccountModelService } from './account-model.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    controllers: [AccountController],
    providers: [AccountModelService],
    exports: [AccountModelService],
})
export class AccountModule {}

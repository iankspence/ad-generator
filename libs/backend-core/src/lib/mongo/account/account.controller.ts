import { AccountModelService } from './account-model.service';
import { Account } from '@monorepo/type';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Patch } from '@nestjs/common';

@Controller('account')
export class AccountController {
    constructor(private readonly accountModelService: AccountModelService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() account: Partial<Account>): Promise<Account> {
        return this.accountModelService.create(account);
    }
    @Get(':_id')
    async findOne(@Param('_id') _id: string): Promise<Account> {
        return await this.accountModelService.findOneById(_id);
    }

    @Put(':_id')
    async updateOneById(@Param('_id') _id: string, @Body() update: Partial<Account>): Promise<Account> {
        return this.accountModelService.updateOneById(_id, update);
    }

    @Delete(':_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneById(@Param('_id') _id: string): Promise<void> {
        await this.accountModelService.deleteOneById(_id);
    }

    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<Account> {
        console.log('get account/user/:userId', userId);
        return await this.accountModelService.findAccountByUserId(userId);
    }

    @Patch('google-query')
    async addGoogleQuery(@Body() dto: { accountId: string; googleQuery: string }) {
        console.log('addGoogleQuery Patch Controller', dto);

        return await this.accountModelService.addGoogleQuery(dto.accountId, dto.googleQuery);
    }

    @Patch('facebook-link')
    async addFacebookLink(@Body() dto: { accountId: string; facebookLink: string }) {
        return await this.accountModelService.addFacebookLink(dto.accountId, dto.facebookLink);
    }

    @Patch('rate-mds-link')
    async addRateMdsLink(@Body() dto: { accountId: string; rateMdsLink: string }) {
        console.log('addRateMdsLink Patch Controller', dto);
        return await this.accountModelService.addRateMdsLink(dto.accountId, dto.rateMdsLink);
    }
}

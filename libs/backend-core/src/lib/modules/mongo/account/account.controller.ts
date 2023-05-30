import { AccountModelService } from './account-model.service';
import { Account, AccountDocument } from '@monorepo/type';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Patch } from '@nestjs/common';
import { Public } from '../../auth/public.decorator';

@Public()
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

    @Post('user')
    async findByUserId(@Body() dto: { userId: string }): Promise<AccountDocument[]> {
        return await this.accountModelService.findAccountsByUserId(dto.userId);
    }

    @Patch('google-query')
    async addGoogleQuery(@Body() dto: { accountId: string; googleQuery: string }) {
        return await this.accountModelService.addGoogleQuery(dto.accountId, dto.googleQuery);
    }

    @Patch('facebook-link')
    async addFacebookLink(@Body() dto: { accountId: string; facebookLink: string }) {
        return await this.accountModelService.addFacebookLink(dto.accountId, dto.facebookLink);
    }

    @Patch('rate-mds-link')
    async addRateMdsLink(@Body() dto: { accountId: string; rateMdsLink: string }) {
        return await this.accountModelService.addRateMdsLink(dto.accountId, dto.rateMdsLink);
    }

    @Post('get-all-text-by-account-id')
    async getAllTextForAccountId(@Body() dto: { accountId: string }) {
        return await this.accountModelService.getAllTextByAccountId(dto.accountId);
    }
}

import { AccountModelService } from './account-model.service';
import { Account, AccountDocument, AddGoogleQueryDto } from '@monorepo/type';
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
    Patch,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

// @Public()
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Patch('add-google-query')
    async addGoogleQuery(@Body() addGoogleQueryDto: AddGoogleQueryDto) {
        return await this.accountModelService.addGoogleQuery(addGoogleQueryDto.accountId, addGoogleQueryDto.googleQuery);
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

import { AccountModelService } from './account-model.service';
import {
    Account,
    AccountDocument,
    AddGoogleQueryDto,
    AddRateMdsLinkDto,
    CreateAccountDto, DeleteAccountDto, FindAccountByUserIdDto, FindAccountsByManagerIdDto,
    FindTextByAccountIdDto, UpdateAccountLogoAndColorsDto, UpdateAccountManagerDto, UpdateAdsPaidWithoutDeliveryDto,
} from '@monorepo/type';
import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Patch,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('account')
export class AccountController {
    constructor(private readonly accountModelService: AccountModelService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
        return this.accountModelService.create(createAccountDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Delete('delete')
    async delete(@Body() deleteAccountDto: DeleteAccountDto): Promise<Account> {
        return this.accountModelService.delete(deleteAccountDto.accountId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('get-accounts')
    async getAccounts(): Promise<AccountDocument[]> {
        return await this.accountModelService.getAccounts();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('find-account-by-user-id')
    async findAccountByUserId(@Body() findAccountByUserIdDto: FindAccountByUserIdDto): Promise<AccountDocument> {
        return await this.accountModelService.findAccountByUserId(findAccountByUserIdDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Patch('add-google-query')
    async addGoogleQuery(@Body() addGoogleQueryDto: AddGoogleQueryDto) {
        return await this.accountModelService.addGoogleQuery(addGoogleQueryDto.accountId, addGoogleQueryDto.googleQuery);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Patch('add-rate-mds-link')
    async addRateMdsLink(@Body() addRateMdsLinkDto: AddRateMdsLinkDto) {
        return await this.accountModelService.addRateMdsLink(addRateMdsLinkDto.accountId, addRateMdsLinkDto.rateMdsLink);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('find-text-by-account-id')
    async findTextByAccountId(@Body() findTextByAccountIdDto: FindTextByAccountIdDto) {
        return await this.accountModelService.findTextByAccountId(findTextByAccountIdDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-account-logo-and-colors')
    async updateAccountLogoAndColors(@Body() updateAccountLogoAndColorsDto: UpdateAccountLogoAndColorsDto): Promise<Account> {
        return this.accountModelService.updateAccountLogoAndColors(updateAccountLogoAndColorsDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-account-manager')
    async updateAccountManager(@Body() updateAccountManagerDto: UpdateAccountManagerDto): Promise<Account> {
        return this.accountModelService.updateAccountManager(updateAccountManagerDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Get('find-unassigned-accounts')
    async findUnassignedAccounts(): Promise<AccountDocument[]> {
        return this.accountModelService.findUnassignedAccounts();
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('content-manager')
    @Post('find-accounts-by-manager-id')
    async findAccountsByManagerId(@Body() findAccountsByManagerId: FindAccountsByManagerIdDto): Promise<AccountDocument[]> {
        return this.accountModelService.findAccountsByManagerId(findAccountsByManagerId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-ads-paid-without-delivery')
    async updateAdsPaidWithoutDelivery(@Body() updateAdsPaidWithoutDeliveryDto: UpdateAdsPaidWithoutDeliveryDto): Promise<Account> {
        return this.accountModelService.updateAdsPaidWithoutDelivery(updateAdsPaidWithoutDeliveryDto.accountId, updateAdsPaidWithoutDeliveryDto.adsPaidWithoutDelivery);
    }
}

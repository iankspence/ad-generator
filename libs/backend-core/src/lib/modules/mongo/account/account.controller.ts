import { AccountModelService } from './account-model.service';
import {
    Account,
    AccountDocument,
    AddGoogleQueryDto,
    AddRateMdsLinkDto,
    CreateAccountDto, FindAccountByUserIdDto, UpdateAccountLogoAndColorsDto,
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
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { GetTextByAccountIdDto } from '@monorepo/type';

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
    @Post('get-text-by-account-id')
    async getTextByAccountId(@Body() getTextByAccountIdDto: GetTextByAccountIdDto) {
        return await this.accountModelService.getTextByAccountId(getTextByAccountIdDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-account-logo-and-colors')
    async updateAccountLogoAndColors(@Body() updateAccountLogoAndColorsDto: UpdateAccountLogoAndColorsDto): Promise<Account> {
        return this.accountModelService.updateAccountLogoAndColors(updateAccountLogoAndColorsDto);
    }
}

// @Delete(':_id')
// @HttpCode(HttpStatus.NO_CONTENT)
// async deleteOneById(@Param('_id') _id: string): Promise<void> {
//     await this.accountModelService.deleteOneById(_id);
// }

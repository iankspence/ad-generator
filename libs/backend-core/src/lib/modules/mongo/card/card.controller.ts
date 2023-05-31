import { Controller, Post, Body, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CopyCardsAndAdDto, DeleteCardsAndAdDto, FindCardsByAccountIdDto, SaveCanvasesToS3Dto } from '@monorepo/type';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('save-canvases')
    async saveCanvases(@Body() saveCanvasesToS3Dto: SaveCanvasesToS3Dto) {
        return this.cardService.saveCanvases(saveCanvasesToS3Dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('find-cards-by-account-id')
    async findCardsByAccountId(@Body() findCardsByAccountIdDto: FindCardsByAccountIdDto) {
    return this.cardService.findCardsByAccountId(findCardsByAccountIdDto.accountId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('copy-cards-and-ad')
    async copyCardsAndAd(@Body() copyCardsAndAdDto: CopyCardsAndAdDto) {
        return this.cardService.copyCardsAndAd(copyCardsAndAdDto.adId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Delete('delete-cards-and-ad')
    @HttpCode(204)
    async deleteCardsAndAd(@Body() deleteCardsAndAdDto: DeleteCardsAndAdDto) {
        return this.cardService.deleteCardsAndAd(deleteCardsAndAdDto.adId);
    }
}

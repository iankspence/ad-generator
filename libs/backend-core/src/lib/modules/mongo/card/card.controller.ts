import { Controller, Post, Body, Get } from '@nestjs/common';
import { CardService } from './card.service';
import {AccountDocument, ReviewDocument, CopyDocument, Ad} from "@monorepo/type";
import * as PIXI from "pixi.js";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post('save-canvases')
    async saveCanvases(
        @Body('canvases') canvases: Array<{canvasName: string, dataUrl: string, sourceTextId: string, sourceText: string, sourceTextEdited: string}>,
        @Body('userId') userId: string,
        @Body('account') account: AccountDocument,
        @Body('review') review: ReviewDocument,
        @Body('copy') copy: CopyDocument,
        @Body('themeId') themeId: string,
        @Body('backgroundImageLocation') backgroundImageLocation: string,
        @Body('maskLocations') maskLocations: {maskLocation: string, maskName: string}[],
        @Body('userControlledAttributes') userControlledAttributes: Ad["userControlledAttributes"],
        @Body('xRanges') xRanges: Ad["xRanges"],
        @Body('yRanges') yRanges: Ad["yRanges"],
        @Body('lineHeightMultipliers') lineHeightMultipliers: Ad["lineHeightMultipliers"],
        @Body('filteredTextPositions') filteredTextPositions: Ad["filteredTextPositions"],
    ) {
        return this.cardService.saveCanvases(canvases, userId, account, review, copy, themeId, backgroundImageLocation, maskLocations, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions);
    }

    @Post('get-cards-by-account-id')
    async getCardsByAccountId(
        @Body('accountId') accountId: string,
    ) {
    return this.cardService.getCardsByAccountId(accountId);
    }
}

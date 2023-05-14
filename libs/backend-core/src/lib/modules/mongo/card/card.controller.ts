import { Controller, Post, Body } from '@nestjs/common';
import { CardService } from './card.service';
import {AccountDocument} from "@monorepo/type";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post('save-canvases')
    async saveCanvases(
        @Body('canvases') canvases: Array<{canvasName: string, dataUrl: string, sourceTextId: string, sourceText: string, sourceTextEdited: string}>,
        @Body('userId') userId: string,
        @Body('account') account: AccountDocument,
        @Body('themeId') themeId: string,
        @Body('backgroundImageLocation') backgroundImageLocation: string,
        @Body('maskLocations') maskLocations: {maskLocation: string, maskName: string}[],
    ) {
        return this.cardService.saveCanvases(canvases, userId, account, themeId, backgroundImageLocation, maskLocations);
    }
}

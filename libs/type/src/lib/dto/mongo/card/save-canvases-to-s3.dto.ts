import { AccountDocument } from '../../../schema/account';
import { ReviewDocument } from '../../../schema/review';
import { CopyDocument } from '../../../schema/copy';
import { Ad, AdDocument } from '../../../schema/ad';

export class SaveCanvasesToS3Dto {
    canvases!: Array<{canvasName: string, dataUrl: string, sourceTextId: string, sourceText: string, sourceTextEdited: string}>;
    userId!: string;
    account!: AccountDocument;
    review!: ReviewDocument;
    copy!: CopyDocument;
    themeId!: string;
    backgroundImageLocation!: string;
    maskLocations!: {maskLocation: string, maskName: string}[];
    userControlledAttributes!: Ad["userControlledAttributes"];
    xRanges!: Ad["xRanges"];
    yRanges!: Ad["yRanges"];
    lineHeightMultipliers!: Ad["lineHeightMultipliers"];
    filteredTextPositions!: Ad["filteredTextPositions"];
    editAd!: AdDocument;
}

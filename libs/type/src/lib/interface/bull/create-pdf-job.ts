import { AdSetDocument } from "../../schema/ad-set";

export interface CreatePdfJob {
    adSet: AdSetDocument;
    accountId: string;
}

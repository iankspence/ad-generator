export class ExternalGoogleMapsReviewsV3Dto {
    query!: string[] | string;
    reviewsLimit?: number;
    reviewsQuery?: string;
    limit?: number;
    sort?: string;
    skip?: number;
    startUrl?: number;
    cutoff?: number;
    cutoffRating?: number;
    ignoreEmpty?: boolean;
    language?: string;
    region?: string;
    fields?: string;
    async?: boolean;
    ui?: boolean;
    webhook?: string;
}

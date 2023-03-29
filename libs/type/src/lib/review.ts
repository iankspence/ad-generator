export interface Review {
    id: string;
    clinicId: string;
    platform: string;
    author: string;
    rating: number;
    reviewText: string;
    reviewYear: number;
    reviewMonth: number;
    reviewDay: number;
}
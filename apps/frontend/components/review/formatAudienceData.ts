import { audiences } from '../../utils/constants/audiences';

export const formatAudienceData = (reviews: any[]) => {
    const audienceData: any[] = [];

    audiences.forEach((audience) => {

        const googleReviews = reviews.filter(
            (review) => review.source === 'Google' && audiences[review.bestFitAudience - 1]?.name === audience.name,
        ).length;
        const rateMDsReviews = reviews.filter(
            (review) =>
                review.source === 'RateMDs' && audiences[review.bestFitAudience - 1]?.name === audience.name,
        ).length;

        audienceData.push({
            name: audience.name,
            age: audience.ageRange,
            interests: audience.interests,
            googleReviews: googleReviews,
            rateMDsReviews: rateMDsReviews,
            totalReviews: googleReviews + rateMDsReviews,
        });
    });

    return audienceData;
};

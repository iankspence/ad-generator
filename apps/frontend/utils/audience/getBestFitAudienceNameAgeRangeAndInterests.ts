import { audiences } from '../constants/audiences';

export const getBestFitAudienceNameAgeRangeAndInterests = (ad) => {

    if (ad.bestFitAudience) {
        const bestFitAudience = audiences[ad.bestFitAudience - 1];
        const bestFitAudienceName = bestFitAudience.name;
        const ageRange = bestFitAudience.ageRange;
        const interests = bestFitAudience.interests;
        return { bestFitAudienceName, ageRange, interests };
    }

}

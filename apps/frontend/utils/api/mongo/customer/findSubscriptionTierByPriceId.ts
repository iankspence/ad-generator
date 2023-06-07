import { pricingData } from '../../../constants/pricingData';

export function findSubscriptionTierByPriceId(priceId: string): string | null {
    for (const pricing of pricingData) {
        if (pricing.monthlyPriceId === priceId || pricing.annualPriceId === priceId) {
            return pricing.tier;
        }
    }
    return null;
}

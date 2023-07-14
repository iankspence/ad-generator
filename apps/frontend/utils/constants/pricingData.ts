export interface PricingData {
    tier: string;
    description: string;
    bullets: string[];
    oneTimePrice: string;
    priceId: string;
}

export const pricingData: PricingData[] = [
    {
        tier: 'Content Package',
        description: 'Stop discounting your services and start advertising with education and social proof. This is a one-time payment, with all of your deliverables available in 1 week or less.',
        bullets: ['One-time payment', '15x branded ‘social proof’ ads', '2x branded eBooks'],
        oneTimePrice: '',
        priceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NTM7DI9vNNZO1dY7exvHyXj' : 'price_1NTL1II9vNNZO1dY4GBGzMLu',
    },

    {
        tier: 'Lead Gen Partnership',
        description: 'We’ll manage your ads to generate and nurture leads so you can focus on your practice. After the one-time setup payment, you only pay for leads who show up (we pay for the ads).',
        bullets: ['One-time payment (includes everything in Content Package)', 'Performance-based partnership (x$/lead)', 'Bi-weekly reporting'],
        oneTimePrice: '',
        priceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NTM7DI9vNNZO1dY7exvHyXj' : 'price_1NTL1II9vNNZO1dY4GBGzMLu',
    }
];

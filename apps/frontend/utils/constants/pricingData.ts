export interface PricingData {
    tier: string;
    description: string;
    bullets: string[];
    monthly: string;
    annual: string;
    monthlyPriceId: string;
    annualPriceId: string;
}

export const pricingData: PricingData[] = [
    {
        tier: 'Practitioner',
        description: 'For individual professionals who seek unique ad content monthly. Access creativity and stand out without stress.',
        bullets: ['2 Unique Ads per Month', 'Ideal for Solo Practitioners', 'Creatives Available for Download'],
        monthly: '$199 CAD',
        annual: '$1990 CAD',
        monthlyPriceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NLPpZI9vNNZO1dYArjdOjYs' : 'price_1NG8QHI9vNNZO1dYwg2bqSCB',
        annualPriceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NLPpZI9vNNZO1dYlFw5HOki' : 'price_1NG8QHI9vNNZO1dYzQKVqf5F',
    },
    {
        tier: 'Team',
        description: 'For businesses seeking diversity and quantity in their ad content. More creative, more impact.',
        bullets: ['4 Unique Ads per Month', 'Ideal for Small Teams', 'Creatives Available for Download'],
        monthly: '$299 CAD',
        annual: '$2990 CAD',
        monthlyPriceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NLPpjI9vNNZO1dYZkHk5BAW' : 'price_1NG8RrI9vNNZO1dYLSVEMsVD',
        annualPriceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NLPpjI9vNNZO1dYpkvadg1W' : 'price_1NG8RrI9vNNZO1dYX4ccEnlu',
    },
    {
        tier: 'Clinic',
        description: 'Our done-for-you ad management service. We handle ad creation, posting, and data analytics for optimal ad performance.',
        bullets: ['Full-Service Ad Management', 'Ideal for Top-Tier Clinics', 'Creatives + Analytics Available for Download'],
        monthly: '$399 CAD',
        annual: '$3990 CAD',
        monthlyPriceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NLPpqI9vNNZO1dYUZutFSey' : 'price_1NG8TjI9vNNZO1dY84GsldIr',
        annualPriceId: (process.env.NEXT_PUBLIC_FRONTEND_URI === "https://reviewdrum.com") ? 'price_1NLPpqI9vNNZO1dYS1Ka2PrS' : 'price_1NG8TjI9vNNZO1dY5szAaoCd',
    },
];

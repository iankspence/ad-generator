module.exports = {
    content: ['./apps/frontend/pages/**/*.{js,ts,jsx,tsx}', './apps/frontend/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                reviewDrumDarkGray: '#1E1E1E',
                reviewDrumMedGray: '#9E9E9E',
                reviewDrumLightGray: '#D9D9D9',
                reviewDrumOrange: '#FFA726',
                reviewDrumBlue: '#1A73E8',
            },
            textColor: {
                reviewDrumDarkGray: '#1E1E1E',
                reviewDrumMedGray: '#9E9E9E',
                reviewDrumLightGray: '#D9D9D9',
                reviewDrumOrange: '#FFA726',
                reviewDrumBlue: '#1A73E8',
            },
            border: {
                reviewDrumOrange: '1px solid #FFA726',
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

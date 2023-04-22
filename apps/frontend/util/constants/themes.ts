export const themes = [
    {
        id: 'basic-swoosh',
        name: 'Basic Swoosh',
        settings: {
            short: {
                imageLayer: {
                    /* Image layer settings for short canvas */
                },
                maskLayers: [
                    {
                        id: 'basic-swoosh-short-base-1',
                        colour: '#123123',
                        /* Additional settings for this mask layer */
                    },
                    {
                        id: 'basic-swoosh-short-base-2',
                        colour: '#456456',
                        /* Additional settings for this mask layer */
                    },
                ],
            },
            tall: {
                imageLayer: {
                    /* Image layer settings for tall canvas */
                },
                maskLayers: [
                    {
                        id: 'basic-swoosh-tall-base-1',
                        /* Additional settings for this mask layer */
                    },
                    {
                        id: 'basic-swoosh-tall-base-2',
                        /* Additional settings for this mask layer */
                    },
                ],
            },
        },
    },
    // Additional themes can be added here.
];

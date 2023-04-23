export const themes = [
    {
        id: 'basic-swoosh',
        name: 'Basic Swoosh',
        settings: {
            primaryColour: '#123123',
            secondaryColour: '#456456',
            shortCanvas: {
                imageLayer: {
                    /* Image layer settings for short canvas */
                },
                maskLayers: [
                    {
                        id: 'basic-swoosh-short-base-1',
                    },
                    {
                        id: 'basic-swoosh-short-base-2',
                    },
                ],
            },
            tallCanvas: {
                imageLayer: {
                    /* Image layer settings for tall canvas */
                },
                maskLayers: [
                    {
                        id: 'basic-swoosh-tall-base-1',
                    },
                    {
                        id: 'basic-swoosh-tall-base-2',
                    },
                ],
            },
        },
    },
];

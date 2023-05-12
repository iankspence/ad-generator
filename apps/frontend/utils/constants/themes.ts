


export const themes = [
    {
        id: 'basic-swoosh',
        settings: {
            shortMasks: [
                {
                    name: 'basic-swoosh-short-base-1',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'adjacent',
                        minMaxType: 'min',
                        minMaxDistance: 0,
                    }
                },
                {
                    name: 'basic-swoosh-short-base-2',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 1,
                    }
                },
            ],
            tallMasks: [
                {
                    name: 'basic-swoosh-tall-base-1',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 0,
                    }
                },
                {
                    name: 'basic-swoosh-tall-base-2',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 2,
                    }
                },
            ],
            hookTextDefaults: {
                hookMainText: {
                    canvasName: 'hook',
                    textName: 'main',
                    yRange: [260, 315],
                    xRange: [15, 305],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    },
                },
                hookAuthorText: {
                    canvasName: 'hook',
                    textName: 'author',
                    yRange: [260, 315],
                    xRange: [15, 305],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    }
                },
            },
            claimTextDefaults: {
                claimMainText: {
                    canvasName: 'claim',
                    textName: 'main',
                    yRange: [265, 315],
                    xRange: [15, 305],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    },
                },
            },
            reviewTextDefaults: {
                reviewMainText: {
                    canvasName: 'review',
                    textName: 'main',
                    yRange: [225, 315],
                    xRange: [15, 305],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "justify",
                    }
                },
                reviewAuthorText: {
                    canvasName: 'review',
                    textName: 'author',
                    yRange: [225, 315],
                    xRange: [15, 305],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "justify",
                    }
                },
            },
            closeTextDefaults: {
                closeMainText: {
                    canvasName: 'close',
                    textName: 'main',
                    yRange: [265, 315],
                    xRange: [15, 305],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    },
                },
            }
        },
    },
    {
        id: 'complex-swoosh',
        settings: {
            shortMasks: [
                {
                    name: 'basic-swoosh-short-base-1',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 0,
                    }
                },
                {
                    name: 'basic-swoosh-short-base-2',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 2,
                    }
                },
            ],
            tallMasks: [
                {
                    name: 'basic-swoosh-tall-base-1',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 0,
                    }
                },
                {
                    name: 'basic-swoosh-tall-base-2',
                    autoColor: {
                        sourceType: 'primary',
                        autoType: 'split-complementary-1',
                        minMaxType: 'max',
                        minMaxDistance: 2,
                    }
                },
            ],
            hookTextDefaults: {
                hookMainText: {
                    canvasName: 'hook',
                    textName: 'main',
                    yRange: [270, 310],
                    xRange: [20, 300],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    },
                },
                hookAuthorText: {
                    canvasName: 'hook',
                    textName: 'author',
                    yRange: [270, 310],
                    xRange: [20, 300],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    }
                },
            },
            claimTextDefaults: {
                claimMainText: {
                    canvasName: 'claim',
                    textName: 'main',
                    yRange: [270, 310],
                    xRange: [20, 300],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    },
                },
            },
            reviewTextDefaults: {
                reviewMainText: {
                    canvasName: 'review',
                    textName: 'main',
                    yRange: [220, 300],
                    xRange: [20, 300],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    }
                },
                reviewAuthorText: {
                    canvasName: 'review',
                    textName: 'author',
                    yRange: [220, 300],
                    xRange: [20, 300],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    }
                },
            },
            closeTextDefaults: {
                closeMainText: {
                    canvasName: 'close',
                    textName: 'main',
                    yRange: [270, 310],
                    xRange: [20, 300],
                    style: {
                        fontFamily: "Arial",
                        fill: "white",
                        wordWrap: true,
                        align: "left",
                    },
                },
            }
        },
    },
];

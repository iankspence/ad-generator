import * as PIXI from 'pixi.js';

export const themes = [
    {
        id: 'basic-swoosh',
        settings: {
            shortMasks: [
                {
                    name: 'basic-swoosh-short-base-1',
                    colour: '#123123',
                },
                {
                    name: 'basic-swoosh-short-base-2',
                    colour: '#154345',
                },
            ],
            tallMasks: [
                {
                    name: 'basic-swoosh-tall-base-1',
                    colour: '#123123',
                },
                {
                    name: 'basic-swoosh-tall-base-2',
                    colour: '#154345',
                },
            ],
            hookTextDefaults: {
                hookMainText: {
                    canvasName: 'hook',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    },
                },
                hookAuthorText: {
                    canvasName: 'hook',
                    textName: 'author',
                    x: 120,
                    y: 180,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                hookDateText: {
                    canvasName: 'hook',
                    textName: 'date',
                    x: 120,
                    y: 200,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                hookSourceText: {
                    canvasName: 'hook',
                    textName: 'source',
                    x: 120,
                    y: 220,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
            },
            claimTextDefaults: {
                claimMainText: {
                    canvasName: 'claim',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    },
                },
            },
            reviewTextDefaults: {
                reviewMainText: {
                    canvasName: 'review',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    }
                },
                reviewAuthorText: {
                    canvasName: 'review',
                    textName: 'author',
                    x: 120,
                    y: 180,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                reviewDateText: {
                    canvasName: 'review',
                    textName: 'date',
                    x: 120,
                    y: 200,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                reviewSourceText: {
                    canvasName: 'review',
                    textName: 'source',
                    x: 120,
                    y: 220,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                }
            },
            closeTextDefaults: {
                closeMainText: {
                    canvasName: 'close',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
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
                    name: 'complex-swoosh-short-base-1',
                    colour: '#146842',
                },
                {
                    name: 'complex-swoosh-short-base-2',
                    colour: '#154345',
                },
            ],
            tallMasks: [
                {
                    name: 'complex-swoosh-tall-base-1',
                    colour: '#123123',
                },
                {
                    name: 'complex-swoosh-tall-base-2',
                    colour: '#154345',
                },
            ],
            hookTextDefaults: {
                hookMainText: {
                    canvasName: 'hook',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    },
                },
                hookAuthorText: {
                    canvasName: 'hook',
                    textName: 'author',
                    x: 120,
                    y: 180,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                hookDateText: {
                    canvasName: 'hook',
                    textName: 'date',
                    x: 120,
                    y: 200,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                hookSourceText: {
                    canvasName: 'hook',
                    textName: 'source',
                    x: 120,
                    y: 220,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
            },
            claimTextDefaults: {
                claimMainText: {
                    canvasName: 'claim',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    },
                },
            },
            reviewTextDefaults: {
                reviewMainText: {
                    canvasName: 'review',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    }
                },
                reviewAuthorText: {
                    canvasName: 'review',
                    textName: 'author',
                    x: 120,
                    y: 180,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                reviewDateText: {
                    canvasName: 'review',
                    textName: 'date',
                    x: 120,
                    y: 200,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                },
                reviewSourceText: {
                    canvasName: 'review',
                    textName: 'source',
                    x: 120,
                    y: 220,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 16,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 20,
                    }
                }
            },
            closeTextDefaults: {
                closeMainText: {
                    canvasName: 'close',
                    textName: 'main',
                    x: 120,
                    y: 140,
                    style: {
                        fontFamily: "Arial",
                        fontSize: 24,
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: 200,
                        align: "left",
                        lineHeight: 30,
                    },
                },
            }
        },
    },
];

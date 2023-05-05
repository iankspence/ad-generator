import * as PIXI from 'pixi.js';

export const updateTextStyleAndPosition = (mainContent, authorContent, mainStyle, authorStyle, canvasSize, xRange, yRange, lineHeightMultiplier) => {
    const wordWrapWidth = (xRange[1] - xRange[0])
    const mainFontSize = 10;
    const updatedMainStyle = { ...mainStyle, fontSize: mainFontSize, lineHeight: mainFontSize * lineHeightMultiplier, wordWrapWidth };
    const updatedMainPosition = { x: xRange[0], y: yRange[0] };

    let updatedAuthorStyle = null;
    let updatedAuthorPosition = null;

    // Hook and Review have author text
    if (authorStyle) {
        const authorFontSize = 10;
        updatedAuthorStyle = { ...authorStyle, fontSize: authorFontSize, lineHeight: authorFontSize * lineHeightMultiplier, wordWrapWidth };
        updatedAuthorPosition = { x: xRange[0], y: yRange[0] };
    }

    let totalHeight = 0;
    let mainTextMetrics, authorTextMetrics;

    do {
        updatedMainStyle.fontSize += 0.25;
        updatedMainStyle.lineHeight = updatedMainStyle.fontSize * lineHeightMultiplier;
        mainTextMetrics = PIXI.TextMetrics.measureText(mainContent, new PIXI.TextStyle(updatedMainStyle) );
        totalHeight = mainTextMetrics.height;

        if (updatedAuthorPosition && updatedAuthorStyle) {
            updatedAuthorStyle.fontSize = updatedMainStyle.fontSize * 0.8;
            updatedAuthorStyle.lineHeight = updatedAuthorStyle.fontSize * lineHeightMultiplier;
            authorTextMetrics = PIXI.TextMetrics.measureText(authorContent, new PIXI.TextStyle(updatedAuthorStyle));
            totalHeight = mainTextMetrics.height + authorTextMetrics.height + (mainTextMetrics.height * 0.07);
        }

    } while (totalHeight <= (yRange[1] - yRange[0]));

    updatedMainStyle.fontSize -= 0.25;
    updatedMainStyle.lineHeight = updatedMainStyle.fontSize * lineHeightMultiplier;
    mainTextMetrics = PIXI.TextMetrics.measureText(mainContent, new PIXI.TextStyle(updatedMainStyle));

    const mainTextHeight = mainTextMetrics.height;
    const authorSpacing = mainTextHeight * 0.03;

    if (updatedAuthorPosition && updatedAuthorStyle) {
        updatedAuthorStyle.fontSize = updatedMainStyle.fontSize * 0.8;
        updatedAuthorStyle.lineHeight = updatedAuthorStyle.fontSize * lineHeightMultiplier;
        updatedAuthorPosition.y = updatedMainPosition.y + mainTextHeight + authorSpacing;
    }

    return { main: { updatedStyle: updatedMainStyle, updatedPosition: updatedMainPosition }, author: { updatedStyle: updatedAuthorStyle, updatedPosition: updatedAuthorPosition } };
};

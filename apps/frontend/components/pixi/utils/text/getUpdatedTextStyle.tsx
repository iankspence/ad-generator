import * as PIXI from 'pixi.js';

export const getUpdatedTextStyle = (mainContent, authorContent, mainStyle, authorStyle, canvasSize, xRange, yRange) => {
    const wordWrapWidth = (xRange[1] - xRange[0])
    const mainFontSize = 8;
    const updatedMainStyle = { ...mainStyle, fontSize: mainFontSize, lineHeight: mainFontSize * 1.33, wordWrapWidth };
    const updatedMainPosition = { x: xRange[0], y: 0 };

    const authorFontSize = 8;
    const updatedAuthorStyle = { ...authorStyle, fontSize: authorFontSize, lineHeight: authorFontSize * 1.33, wordWrapWidth };
    const updatedAuthorPosition = { x: xRange[0], y: 0 };

    let totalHeight = 0;
    let mainTextMetrics, authorTextMetrics;

    // Step 1: Expand the text sizes to maximize the yRange
    do {
        updatedMainStyle.fontSize += 0.25;
        updatedMainStyle.lineHeight = updatedMainStyle.fontSize * 1.33;
        mainTextMetrics = PIXI.TextMetrics.measureText(mainContent, new PIXI.TextStyle(updatedMainStyle) );

        console.log('mainTextMetrics:', mainTextMetrics);

        updatedAuthorStyle.fontSize = updatedMainStyle.fontSize * 0.8;
        updatedAuthorStyle.lineHeight = updatedAuthorStyle.fontSize * 1.33;
        authorTextMetrics = PIXI.TextMetrics.measureText(authorContent, new PIXI.TextStyle(updatedAuthorStyle));

            console.log('authorTextMetrics:', authorTextMetrics);

        totalHeight = mainTextMetrics.height + authorTextMetrics.height + (mainTextMetrics.height * 0.07);
    } while (totalHeight <= (yRange[1] - yRange[0]));

    updatedMainStyle.fontSize -= 0.25;
    updatedMainStyle.lineHeight = updatedMainStyle.fontSize * 1.33;
    mainTextMetrics = PIXI.TextMetrics.measureText(mainContent, new PIXI.TextStyle(updatedMainStyle));

    updatedAuthorStyle.fontSize = updatedMainStyle.fontSize * 0.8;
    updatedAuthorStyle.lineHeight = updatedAuthorStyle.fontSize * 1.33;
    authorTextMetrics = PIXI.TextMetrics.measureText(authorContent, new PIXI.TextStyle(updatedAuthorStyle));

    // Calculate new y positions
    const centerY = (yRange[1] - yRange[0] - totalHeight) / 2;
    updatedMainPosition.y = yRange[0] + centerY;
    updatedAuthorPosition.y = updatedMainPosition.y + mainTextMetrics.height + (authorTextMetrics.height * 0.07);

    return { main: { updatedStyle: updatedMainStyle, updatedPosition: updatedMainPosition }, author: { updatedStyle: updatedAuthorStyle, updatedPosition: updatedAuthorPosition } };
};

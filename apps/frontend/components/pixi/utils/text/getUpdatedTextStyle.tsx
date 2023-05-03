export const getUpdatedTextStyle = (originalStyle, content, canvasSize, textName, xRange, yRange, mainTextObject = null) => {
    const wordWrapWidth = xRange[1] - xRange[0];
    const words = content.split(' ');
    let lines = 1;
    let currentLineWidth = 0;

    words.forEach((word) => {
        const wordWidth = originalStyle.fontSize * word.length;
        currentLineWidth += wordWidth;
        if (currentLineWidth > wordWrapWidth) {
            lines++;
            currentLineWidth = wordWidth;
        }
    });

    const updatedStyle = { ...originalStyle };
    const updatedPosition = { x: xRange[0], y: 0 };

    if (textName === 'main') {
        let totalHeight = lines * updatedStyle.lineHeight;

        // Set wordWrapWidth based on xRange
        updatedStyle.wordWrapWidth = wordWrapWidth;

        // Step 1: Expand the text size to maximize the yRange
        let newHeight = lines * updatedStyle.lineHeight;
        while (newHeight <= (yRange[1] - yRange[0])) {
            updatedStyle.fontSize += 1;
            updatedStyle.lineHeight = updatedStyle.fontSize * 1.33;
            lines = Math.ceil((originalStyle.fontSize * (content.length + 1)) / wordWrapWidth);
            newHeight = lines * updatedStyle.lineHeight;
        }
        updatedStyle.fontSize -= 1;
        updatedStyle.lineHeight = updatedStyle.fontSize * 1.33;

        // Step 2: Adjust text size to fit the line length
        let lastLineWidth = currentLineWidth;
        while (lastLineWidth < wordWrapWidth) {
            updatedStyle.fontSize += 1;
            updatedStyle.lineHeight = updatedStyle.fontSize * 1.33;
            currentLineWidth += updatedStyle.fontSize;

            // Calculate the new lastLineWidth
            lastLineWidth = 0;
            words.forEach((word, index) => {
                const wordWidth = updatedStyle.fontSize * word.length;
                if (index !== words.length - 1) {
                    lastLineWidth += wordWidth;
                } else {
                    lastLineWidth += wordWidth / 2;
                }
            });
        }

        // Update the totalHeight based on the new lineHeight
        totalHeight = lines * updatedStyle.lineHeight;

        // Calculate new y position based on rule 1
        const centerY = (yRange[1] - yRange[0] - totalHeight) / 2;
        updatedPosition.y = yRange[0] + centerY;

    } else if (textName === 'author') {
        console.log('mainText in the author is: ', mainTextObject)
        // Rule 3: The main text should always be larger than the author text
        updatedStyle.fontSize = Math.min(mainTextObject.fontSize * 0.8, originalStyle.fontSize);
        updatedStyle.lineHeight = updatedStyle.fontSize * 1.33;
        // Rule 4: Position the author text directly under the main text
        console.log('textName is author, mainTextObject is: ', mainTextObject.x, mainTextObject.y, mainTextObject.width, mainTextObject.height, mainTextObject)

        updatedPosition.y = mainTextObject.y + mainTextObject.height + 5;
        updatedPosition.x = mainTextObject.x;
        console.log('updatedPosition is: ', updatedPosition)
    }

    return { updatedStyle, updatedPosition };
};

export const getUpdatedTextStyle = (originalStyle, content, canvasSize, textName, xRange, yRange, mainTextObject = null) => {
    const wordWrapWidth = xRange[1] - xRange[0];
    const words = content.split(' ');
    let lines = 1;
    let currentLineWidth = 0;

    const fontSize = 12;
    const updatedStyle = { ...originalStyle, fontSize, lineHeight: fontSize * 1.33, wordWrapWidth: (xRange[1] - xRange[0]) };
    const updatedPosition = { x: xRange[0], y: 0 };

    words.forEach((word) => {
        const wordWidth = updatedStyle.fontSize * word.length;
        currentLineWidth += wordWidth;
        if (currentLineWidth > wordWrapWidth) {
            lines++;
            currentLineWidth = wordWidth;
        }
    });

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
        if (mainTextObject) {
            // Rule 3: The main text should always be larger than the author text
            updatedStyle.fontSize = Math.min(mainTextObject.fontSize * 0.8, originalStyle.fontSize);
            updatedStyle.lineHeight = updatedStyle.fontSize * 1.33;
            // Rule 4: Position the author text directly under the main text
            updatedPosition.y = mainTextObject.y + mainTextObject.height + 5;
            updatedPosition.x = mainTextObject.x;
        }
    }

    return { updatedStyle, updatedPosition };
};

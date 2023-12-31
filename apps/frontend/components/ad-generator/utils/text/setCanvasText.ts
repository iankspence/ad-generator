import findTextObject from './findTextObject';
import { addQuotesToText } from "./addQuotesToText";
import { updateTextStyleAndPosition } from "./updateTextStyleAndPosition";
import { formatAuthor } from './author/formatAuthor';
import { HtmlThemeText } from '../../../../type/HtmlThemeText';

const setCanvasText = async (
    canvasName,
    appRef,
    textArray,
    position,
    reviewPosition,
    mainStyleSettings,
    authorStyleSettings,
    size,
    xRange,
    yRange,
    lineHeightMultipliers,
    filteredReviews,
) => {
    if (!canvasName || !textArray || !position || !appRef?.current ) return;

    const app = appRef.current;

    let mainText = '';
    let authorText = '';

    switch (canvasName) {
        case 'hook':
            if (textArray && position > 0 && textArray[position - 1]) {
                if (textArray[position - 1]?.hookTextEdited) {
                    mainText = addQuotesToText(textArray[position - 1]?.hookTextEdited);
                } else {
                    mainText = addQuotesToText(textArray[position - 1]?.hookText);
                }
                authorText = formatAuthor(filteredReviews[reviewPosition - 1]?.author);
            }
            break;
        case 'claim':
            if (textArray && position > 0 && textArray[position - 1]) {
                if (textArray[position - 1]?.claimTextEdited) {
                    mainText = textArray[position - 1]?.claimTextEdited;
                } else {
                    mainText = textArray[position - 1]?.claimText;
                }
            }
            break;
        case 'review':
            if (filteredReviews && reviewPosition > 0 && filteredReviews[reviewPosition - 1]) {
                if (filteredReviews[reviewPosition - 1]?.reviewTextEdited) {
                    mainText = addQuotesToText(filteredReviews[reviewPosition - 1]?.reviewTextEdited);
                } else {
                    mainText = addQuotesToText(filteredReviews[reviewPosition - 1]?.reviewText);
                }
                authorText = formatAuthor(filteredReviews[reviewPosition - 1]?.author);
            }
            break;
        case 'close':
            if (textArray && position > 0 && textArray[position - 1]) {
                if (textArray[position - 1]?.closeTextEdited) {
                    mainText = textArray[position - 1]?.closeTextEdited;
                } else {
                    mainText = textArray[position - 1]?.closeText;
                }
            }
            break;
        default:
            break;
    }

    if (!app || !app.stage || !mainText ) return;

    let mainTextObject = findTextObject(app, `text-${canvasName}-main`);

    if (!mainTextObject) {
        if (!mainStyleSettings.style.fill) {
            console.error('mainStyleSettings.style.fill is undefined');
            return;
        }

        mainTextObject = new HtmlThemeText(mainText, mainStyleSettings.style);
        mainTextObject.name = `text-${canvasName}-main`;
        mainTextObject.zIndex = 3;
        mainTextObject.resolution = 1080 / size;

        mainTextObject.themeId = mainStyleSettings.themeId;

        app.stage.addChild(mainTextObject);
    } else {
        mainTextObject.text = mainText;
        mainTextObject.style = mainStyleSettings.style;
    }

    let authorTextObject;
    if (authorText) {
        authorTextObject = findTextObject(app, `text-${canvasName}-author`);
        if (!authorTextObject) {
            authorTextObject = new HtmlThemeText(authorText, authorStyleSettings.style);
            authorTextObject.name = `text-${canvasName}-author`;
            authorTextObject.zIndex = 3;
            authorTextObject.resolution = 1080 / size;

            authorTextObject.themeId = authorStyleSettings.themeId;

            app.stage.addChild(authorTextObject);
        } else {
            authorTextObject.text = authorText;
            authorTextObject.style = authorStyleSettings.style;
        }
    }

    const { main: { updatedStyle: mainUpdatedStyle, updatedPosition: mainUpdatedPosition }, author: { updatedStyle: authorUpdatedStyle, updatedPosition: authorUpdatedPosition } } = updateTextStyleAndPosition(mainText, authorText, mainStyleSettings.style, authorStyleSettings?.style, size, xRange, yRange, lineHeightMultipliers[canvasName], canvasName);

    mainTextObject.style = mainUpdatedStyle;
    mainTextObject.x = mainUpdatedPosition.x;
    mainTextObject.y = mainUpdatedPosition.y;
    setTimeout(() => {
        mainTextObject.updateText();
        mainTextObject.render(app.renderer)
    }, 300);

    if (mainTextObject.style.fontFamily === 'RobotoCondensed-Regular') {
        await mainTextObject.style.loadFont('/fonts/RobotoCondensed-Regular.ttf', { family: 'RobotoCondensed-Regular' });
    }

    if (mainTextObject.style.fontFamily === 'Montserrat-Regular') {
        await mainTextObject.style.loadFont('/fonts/Montserrat-Regular.ttf', { family: 'Montserrat-Regular' });
    }

    if (mainTextObject.style.fontFamily === 'SFPro-Regular') {
        await mainTextObject.style.loadFont('/fonts/SFPro-Regular.ttf', { family: 'SFPro-Regular' });
    }

    if (mainTextObject.style.fontFamily === 'SegoeUI') {
        await mainTextObject.style.loadFont('/fonts/SegoeUI.ttf', { family: 'SegoeUI' });
    }

    if (authorTextObject) {
        authorTextObject.style = authorUpdatedStyle;
        authorTextObject.x = authorUpdatedPosition.x;
        authorTextObject.y = authorUpdatedPosition.y;

        if (authorTextObject.style.fontFamily === 'RobotoCondensed-Regular') {
            await authorTextObject.style.loadFont('/fonts/RobotoCondensed-Regular.ttf', { family: 'RobotoCondensed-Regular' });
        }

        if (authorTextObject.style.fontFamily === 'Montserrat-Regular') {
            await authorTextObject.style.loadFont('/fonts/Montserrat-Regular.ttf', { family: 'Montserrat-Regular' });
        }

        if (authorTextObject.style.fontFamily === 'SFPro-Regular') {
            await authorTextObject.style.loadFont('/fonts/SFPro-Regular.ttf', { family: 'SFPro-Regular' });
        }

        if (authorTextObject.style.fontFamily === 'SegoeUI') {
            await authorTextObject.style.loadFont('/fonts/SegoeUI.ttf', { family: 'SegoeUI' });
        }
    }
};

export default setCanvasText;

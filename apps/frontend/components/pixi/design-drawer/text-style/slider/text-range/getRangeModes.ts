import {mode} from "../../../../utils/mode";

export const getRangeModes = (activeCanvasNames, xRanges, yRanges) => {
    const xMinValueMode = mode(activeCanvasNames.map((canvas) => xRanges[canvas][0]));
    const xMaxValueMode = mode(activeCanvasNames.map((canvas) => xRanges[canvas][1]));
    const yMinValueMode = mode(activeCanvasNames.map((canvas) => yRanges[canvas][0]));
    const yMaxValueMode = mode(activeCanvasNames.map((canvas) => yRanges[canvas][1]));

    return {
        xMinValueMode,
        xMaxValueMode,
        yMinValueMode,
        yMaxValueMode,
    }
}



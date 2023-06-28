import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable from '../../../hooks/useDraggable/useDraggable';
import { useImage } from '../../../hooks/useImage';
import useText from '../../../hooks/useText';
import useZoom from '../../../hooks/useZoom';
import React, { useRef } from 'react';
import useSync from "../../../hooks/useSync";
import {useRangeBox} from "../../../hooks/useRangeBox";
import useMask from "../../../hooks/useMask";
import useEditStageChildren from '../../../hooks/useEditStageChildren';

const CanvasClient = ({ size, canvasName, primaryColor, secondaryColor }) => {
    const appRef = useRef(null);

    useCanvasApp(appRef, size, canvasName);
    useMask(appRef, canvasName, size);
    useImage(appRef, canvasName);
    useDraggable(appRef, canvasName);
    useZoom(appRef, canvasName);
    useText(appRef, canvasName, size, primaryColor, secondaryColor);
    useRangeBox(appRef, canvasName);
    useSync();

    useEditStageChildren(appRef, canvasName);

    // console.log("CanvasClient: ", appRef);

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default CanvasClient;

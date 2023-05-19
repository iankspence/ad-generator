import { PixiContext } from '../../../contexts/PixiContext';
import useCanvasApp from '../../../hooks/useCanvasApp';
import useDraggable from '../../../hooks/useDraggable';
import { useImage } from '../../../hooks/useImage';
import useText from '../../../hooks/useText';
import useZoom from '../../../hooks/useZoom';
import React, { useContext, useRef } from 'react';
import useSync from "../../../hooks/useSync";
import {useRangeBox} from "../../../hooks/useRangeBox";
import useMask from "../../../hooks/useMask";

const CanvasClient = ({ size, canvasName, primaryColor, secondaryColor }) => {
    const appRef = useRef(null);
    const {updateCanvasApp, backgroundImageLocation} = useContext(PixiContext);

    // console.log("CanvasClient Colors: ", primaryColor, secondaryColor);

    useCanvasApp(appRef, size, updateCanvasApp, canvasName);

    useMask(appRef, canvasName, size);
    useImage(appRef, backgroundImageLocation, canvasName);
    useDraggable(appRef, canvasName);
    useZoom(appRef, canvasName);
    useText(appRef, canvasName, size, primaryColor, secondaryColor);
    useRangeBox(appRef, canvasName);
    useSync();

    console.log("CanvasClient: ", appRef);

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default CanvasClient;

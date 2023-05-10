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

const CanvasClient = ({ imageUrl, size, canvasName }) => {
    const appRef = useRef(null);
    const {updateCanvasApp} = useContext(PixiContext);

    useCanvasApp(appRef, size, updateCanvasApp, canvasName);

    useMask(appRef, canvasName, size);
    useImage(appRef, imageUrl, canvasName);
    useDraggable(appRef, canvasName);
    useZoom(appRef, canvasName);
    useText(appRef, canvasName, size);
    useRangeBox(appRef, canvasName);
    useSync();

    return <div id={`${canvasName}-canvas-container`}></div>;
};

export default CanvasClient;

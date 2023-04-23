import ImageLayer from '../layer/ImageLayer';
import MaskLayer from '../layer/MaskLayer';
import React from 'react';

export const renderLayer = (layer, appRef) => {
    if (layer.type === 'image') {
        return <ImageLayer key={layer.id} appRef={appRef} imageUrl={layer.imageUrl} />;
    } else if (layer.type === 'mask') {
        return <MaskLayer key={layer.id} appRef={appRef} maskName={layer.maskName} colour={layer.colour} />;
    }
};

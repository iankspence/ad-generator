import { useContext, useEffect } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import { findImageContainer } from "../components/ad-generator/utils/findImageContainer";

const useSync = () => {
    const { canvasApps, activeCanvases, eventEmitter } = useContext(PixiContext);

    const getImageContainers = () => {
        const imageContainers = {};
        for (const key in activeCanvases) {
            if (activeCanvases[key]) {
                const canvasApp = canvasApps[key];
                if (canvasApp) {
                    imageContainers[`image-${key}`] = findImageContainer(canvasApps, key);
                }
            }
        }
        return imageContainers;
    };

    const imageContainers = getImageContainers();

    const syncImageContainers = (container) => {
        if (!container) return;
        const actionCanvasName = container.name;
        const actionImageContainer = imageContainers[actionCanvasName];

        for (const key in imageContainers) {
            if (key !== actionCanvasName) {
                const imageContainer = imageContainers[key];
                if (imageContainer && actionImageContainer) {
                    imageContainer.position.set(
                        actionImageContainer.position.x,
                        actionImageContainer.position.y
                    );
                    imageContainer.scale.set(
                        actionImageContainer.scale.x,
                        actionImageContainer.scale.y
                    );
                }
            }
        }
    };

    useEffect(() => {
        eventEmitter.on('dragstart', syncImageContainers);
        eventEmitter.on('dragmove', syncImageContainers);
        eventEmitter.on('dragend', syncImageContainers);
        eventEmitter.on('zoom', syncImageContainers);

        return () => {
            eventEmitter.off('dragstart', syncImageContainers);
            eventEmitter.off('dragmove', syncImageContainers);
            eventEmitter.off('dragend', syncImageContainers);
            eventEmitter.off('zoom', syncImageContainers);
        };
    }, [eventEmitter]);
};

export default useSync;

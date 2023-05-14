import { PixiContext } from '../contexts/PixiContext';
import { useCallback, useContext } from 'react';
import { saveCanvasesToS3 } from '../utils/api';
import UserContext from "../contexts/UserContext";

const useSave = (width = 1080, height = 1080) => {
    const { canvasApps } = useContext(PixiContext);
    const { account } = useContext(UserContext);

    const getCanvasData = useCallback(
        async (app) => {
            if (app) {
                const originalWidth = app.screen.width;
                const originalHeight = app.screen.height;
                const originalScaleX = app.stage.scale.x;
                const originalScaleY = app.stage.scale.y;

                const targetScaleX = width / originalWidth;
                const targetScaleY = height / originalHeight;

                app.renderer.resize(width, height);
                app.stage.scale.set(originalScaleX * targetScaleX, originalScaleY * targetScaleY);

                app.renderer.render(app.stage);
                const dataUrl = app.view.toDataURL('image/png');

                app.renderer.resize(originalWidth, originalHeight);
                app.stage.scale.set(originalScaleX, originalScaleY);

                return dataUrl;
            }
        },
        [width, height],
    );

    const saveAllApps = useCallback(async () => {
        const canvasNames = ['hook', 'claim', 'review', 'close'];
        const canvases = await Promise.all(canvasNames.map(async (name) => {
            const dataUrl = await getCanvasData(canvasApps[name]);
            return { canvasName: name, dataUrl };
        }));

        try {
            await saveCanvasesToS3(canvases, account);
        } catch (error) {
            console.error('Error sending images to backend:', error);
        }
    }, [canvasApps, getCanvasData, account]);

    return { saveAllApps };
};

export default useSave;

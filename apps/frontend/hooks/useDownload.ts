import { PixiContext } from '../contexts/PixiContext';
import { useCallback, useContext } from 'react';
import { saveCanvasToS3 } from '../utils/api';
import UserContext from "../contexts/UserContext";

const useDownload = (width = 1080, height = 1080) => {
    const { canvasApps } = useContext(PixiContext);
    const { account } = useContext(UserContext);

    const sendCanvasToBackend = useCallback(
        async (app, canvasName) => {
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

                try {
                    await saveCanvasToS3(canvasName, dataUrl, account);
                } catch (error) {
                    console.error('Error sending image to backend:', error);
                }
            }
        },
        [width, height, account],
    );

    const saveHookApp = useCallback(() => {
        sendCanvasToBackend(canvasApps['hook'], 'hook');
    }, [canvasApps, sendCanvasToBackend]);

    const saveClaimApp = useCallback(() => {
        sendCanvasToBackend(canvasApps['claim'], 'claim');
    }, [canvasApps, sendCanvasToBackend]);

    const saveReviewApp = useCallback(() => {
        sendCanvasToBackend(canvasApps['review'], 'review');
    }, [canvasApps, sendCanvasToBackend]);

    const saveCloseApp = useCallback(() => {
        sendCanvasToBackend(canvasApps['close'], 'close');
    }, [canvasApps, sendCanvasToBackend]);

    return { saveHookApp, saveClaimApp, saveReviewApp, saveCloseApp };
};

export default useDownload;

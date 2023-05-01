import { PixiContext } from '../contexts/PixiContext';
import { useCallback, useContext } from 'react';

const useDownload = (width = 1080, height = 1080) => {
    const { canvasApps } = useContext(PixiContext);

    const downloadCanvas = useCallback(
        (app, filename) => {
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

                const link = document.createElement('a');
                link.download = filename;
                link.href = dataUrl;
                link.click();
            }
        },
        [width, height],
    );

    const downloadHookApp = useCallback(() => {
        downloadCanvas(canvasApps['hook'], 'hook-image.png');
    }, [canvasApps, downloadCanvas]);

    const downloadClaimApp = useCallback(() => {
        downloadCanvas(canvasApps['claim'], 'claim-image.png');
    }, [canvasApps, downloadCanvas]);

    const downloadReviewApp = useCallback(() => {
        downloadCanvas(canvasApps['review'], 'review-image.png');
    }, [canvasApps, downloadCanvas]);

    const downloadCloseApp = useCallback(() => {
        downloadCanvas(canvasApps['close'], 'close-image.png');
    }, [canvasApps, downloadCanvas]);

    return { downloadHookApp, downloadClaimApp, downloadReviewApp, downloadCloseApp };
};

export default useDownload;

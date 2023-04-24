import { PixiContext } from '../contexts/PixiContext';
import { useCallback, useContext } from 'react';

const useDownload = (width = 1080, height = 1080) => {
    const { hookApp, claimApp, reviewApp, closeApp } = useContext(PixiContext);

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
        downloadCanvas(hookApp, 'hook-image.png');
    }, [hookApp, downloadCanvas]);

    const downloadClaimApp = useCallback(() => {
        downloadCanvas(claimApp, 'claim-image.png');
    }, [claimApp, downloadCanvas]);

    const downloadReviewApp = useCallback(() => {
        downloadCanvas(reviewApp, 'review-image.png');
    }, [reviewApp, downloadCanvas]);

    const downloadCloseApp = useCallback(() => {
        downloadCanvas(closeApp, 'close-image.png');
    }, [closeApp, downloadCanvas]);

    return { downloadHookApp, downloadClaimApp, downloadReviewApp, downloadCloseApp };
};

export default useDownload;

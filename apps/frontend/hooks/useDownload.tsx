import { useCallback } from 'react';

const useDownload = (app, filename = 'canvas.png', width = 1080, height = 1080) => {
    return useCallback(() => {
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
    }, [app, filename, width, height]);
};

export default useDownload;

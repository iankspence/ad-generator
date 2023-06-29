export const getCanvasData = async (app, width, height) => {
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
};

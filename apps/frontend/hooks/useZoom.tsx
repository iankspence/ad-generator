import { useEffect, useCallback } from 'react';

const useZoom = (appRef, scaleFactor = 1.1) => {
    const handleWheel = useCallback(
        (event) => {
            const app = appRef.current;

            if (!app) return;

            event.preventDefault();

            const direction = event.deltaY < 0 ? 1 : -1;
            const scale = direction > 0 ? scaleFactor : 1 / scaleFactor;

            app.stage.scale.x *= scale;
            app.stage.scale.y *= scale;
        },
        [appRef, scaleFactor],
    );

    useEffect(() => {
        if (!appRef?.current) return;

        const app = appRef.current;

        if (!app || !app?.view) return;

        if (app && app.view) {
            app.view.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (app && app.view) {
                app.view.removeEventListener('wheel', handleWheel);
            }
        };
    }, [appRef, handleWheel]);
};

export default useZoom;

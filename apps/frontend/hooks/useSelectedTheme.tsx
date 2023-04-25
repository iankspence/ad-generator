import { addImageLayer } from '../components/pixi/utils/addImageLayers';
import { addMaskLayers } from '../components/pixi/utils/addMaskLayers';
import { removeLayer } from '../components/pixi/utils/removeLayer';
import { useLayerContext } from '../contexts/LayerContext';
import { themes } from '../utils/constants/themes';
import { useEffect, useState } from 'react';

const useSelectedThemes = (imageUrl, selectedThemeId, canvasName) => {
    const [imageLayerId, setImageLayerId] = useState(null);
    const [maskLayerIds, setMaskLayerIds] = useState([]);
    const { setLayers } = useLayerContext();

    useEffect(() => {
        if (selectedThemeId) {
            const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

            if (imageUrl && selectedTheme) {
                if (imageLayerId) {
                    removeLayer(imageLayerId, setLayers);
                }
                if (maskLayerIds) {
                    maskLayerIds.forEach((maskLayerId) => {
                        removeLayer(maskLayerId, setLayers);
                    });
                }
                addImageLayer(selectedTheme, setImageLayerId, setLayers, imageUrl, canvasName);
                addMaskLayers(selectedTheme, setMaskLayerIds, setLayers, canvasName);
            }
        }
    }, [selectedThemeId, imageUrl]);
};

export default useSelectedThemes;

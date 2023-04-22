import { createContext, useState, useContext } from 'react';

const LayerContext = createContext(null);

export const LayerProvider = ({ children }) => {
    const [layers, setLayers] = useState([]);

    return <LayerContext.Provider value={{ layers, setLayers }}>{children}</LayerContext.Provider>;
};

export const useLayerContext = () => useContext(LayerContext);

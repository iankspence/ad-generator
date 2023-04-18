import { createContext, useCallback, useState } from 'react';

const SkyBubblesThemeContext = createContext({
    gradientColors: {
        color1: 'rgba(95, 195, 228, 1)',
        color2: 'rgba(88, 147, 233, 1)',
    },
    bubbleCount: 30,
    minSize: 15,
    maxSize: 50,
    updateTheme: (newTheme: any) => void 0,
});

export const SkyBubblesThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        gradientColors: {
            color1: 'rgba(95, 195, 228, 1)',
            color2: 'rgba(88, 147, 233, 1)',
        },
        bubbleCount: 30,
        minSize: 15,
        maxSize: 50,
    });

    const updateTheme = useCallback((newTheme) => {
        setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
    }, []);

    return (
        <SkyBubblesThemeContext.Provider value={{ ...theme, updateTheme }}>{children}</SkyBubblesThemeContext.Provider>
    );
};

export default SkyBubblesThemeContext;

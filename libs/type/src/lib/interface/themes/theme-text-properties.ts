import { ThemeAutoColor } from './theme-auto-color';
import { ThemeTextStyle } from './theme-text-style';

export interface ThemeTextProperties {
    canvasName: string;
    textName: string;
    yRange: [number, number];
    xRange: [number, number];
    autoColor: ThemeAutoColor;
    style: ThemeTextStyle;
}

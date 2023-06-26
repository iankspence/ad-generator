import { ThemeAutoColor } from './ThemeAutoColor';
import { ThemeTextStyle } from './ThemeTextStyle';

export interface ThemeTextProperties {
    canvasName: string;
    textName: string;
    yRange: [number, number];
    xRange: [number, number];
    autoColor: ThemeAutoColor;
    style: ThemeTextStyle;
}

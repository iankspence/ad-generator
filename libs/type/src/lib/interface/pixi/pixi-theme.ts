export interface PixiTheme {
    id: 'basic-swoosh' | 'complex-swoosh';
    name: 'Basic Swoosh' | 'Complex Swoosh';
    primaryColour: string;
    secondaryColour: string;
    settings: {
        short: {
            imageLayer: any; // You can replace `any` with a specific type for image layer settings
            maskLayers: Array<any>; // You can replace `any` with a specific type for mask layer settings
        };
        tall: {
            imageLayer: any; // You can replace `any` with a specific type for image layer settings
            maskLayers: Array<any>; // You can replace `any` with a specific type for mask layer settings
        };
    };
}

declare module 'react-dropzone' {
    import { DropzoneOptions } from 'dropzone';

    interface DropzoneProps extends Omit<DropzoneOptions, 'url'> {
        children?: React.ReactNode;
        accept?: {
            [key: string]: string | string[];
        };
    }

    export const useDropzone: (options: DropzoneProps) => any;
    export type Accept = string;
}

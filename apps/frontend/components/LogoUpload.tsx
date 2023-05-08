import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ColorThief from 'colorthief';

const LogoUpload = ({ onColorsExtracted }) => {
    const [logo, setLogo] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setLogo(reader.result);
            extractColors(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    const extractColors = (logoData) => {
        const img = new Image();
        const colorThief = new ColorThief();

        img.onload = () => {
            const colors = colorThief.getPalette(img, 5).filter(([r, g, b]) => r !== 0 && g !== 0 && b !== 0 && r !== 255 && g !== 255 && b !== 255);
            onColorsExtracted(colors[0], colors[1]);
        };
        img.src = logoData;
    };

    return (
        <div {...getRootProps()} className="logo-upload">
            <input {...getInputProps()} />
            {logo ? <img src={logo} alt="Uploaded Logo" /> : <p>Drag and drop a logo or click to select a file</p>}
        </div>
    );
};

export default LogoUpload;

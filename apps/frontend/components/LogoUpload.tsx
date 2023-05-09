import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ColorThief from 'colorthief';
import { updateAccountLogoAndColors } from '../utils/api';

const LogoUpload = ({ onColorsExtracted, accountId, initialLogo, initialPrimaryColor, initialSecondaryColor }) => {
    const [logo, setLogo] = useState(null);
    const [primaryColor, setPrimaryColor] = useState(null);
    const [secondaryColor, setSecondaryColor] = useState(null);

    useEffect(() => {
        if (initialLogo) {
            setLogo(initialLogo);
        }
        if (initialPrimaryColor) {
            setPrimaryColor(initialPrimaryColor);
        }
        if (initialSecondaryColor) {
            setSecondaryColor(initialSecondaryColor);
        }
    }, [initialLogo, initialPrimaryColor, initialSecondaryColor]);

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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
            'image/svg+xml': ['.svg'],
        },
    });

    const extractColors = (logoData) => {
        const img = new Image();
        const colorThief = new ColorThief();

        img.onload = () => {
            const colors = colorThief
                .getPalette(img, 5)
                .filter(([r, g, b]) => r !== 0 && g !== 0 && b !== 0 && r !== 255 && g !== 255 && b !== 255);
            setPrimaryColor(colors[0]);
            setSecondaryColor(colors[1]);
            onColorsExtracted(colors[0], colors[1]);
            updateAccountLogoAndColors(accountId, logoData, colors[0], colors[1]).then((r) => console.log(r));
        };
        img.src = logoData;
    };

    return (
        <>
            <div {...getRootProps()} className="flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
                <input {...getInputProps()} />
                {logo ? <img src={logo} alt="Uploaded Logo" /> : <p>Drag and drop a logo or click to select a file</p>}
            </div>
            {primaryColor && secondaryColor && (
                <div className="mt-4">
                    <p className="font-semibold py-2">Extracted Colors:</p>
                    <div className="flex">
                        <div
                            className="w-1/2 h-10 rounded"
                            style={{ backgroundColor: `rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})` }}
                        ></div>
                        <div
                            className="w-1/2 h-10 rounded ml-4"
                            style={{ backgroundColor: `rgb(${secondaryColor[0]}, ${secondaryColor[1]}, ${secondaryColor[2]})` }}
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoUpload;

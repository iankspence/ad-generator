import React, {useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import ColorThief from 'colorthief';
import { updateAccountLogoAndColors } from '../../../utils/api/mongo/account/updateAccountLogoAndColorsApi';
import UserContext from "../../../contexts/UserContext";
import { convertRgbToHex } from '../../../utils/color/convertRgbToHex';
import { UpdateAccountLogoAndColorsDto } from '@monorepo/type';

const LogoUpload = ({ refreshAccount, setRefreshAccount }) => {
    const { account, setAccount, user } = useContext(UserContext);

    const extractColors = (logoData) => {
        const img = new Image();
        const colorThief = new ColorThief();

        img.onload = async () => {
            const colorsRgb = colorThief
                .getPalette(img, 5)
                .filter(([r, g, b]) => r !== 0 && g !== 0 && b !== 0 && r !== 255 && g !== 255 && b !== 255);
            const [primaryColorRgb, secondaryColorRgb] = colorsRgb;
            const primaryColor = convertRgbToHex(primaryColorRgb);
            const secondaryColor = convertRgbToHex(secondaryColorRgb);

            const updateAccountLogoAndColorsDto: UpdateAccountLogoAndColorsDto = {
                accountId: account._id.toString(),
                logo: logoData,
                primaryColor,
                secondaryColor,
            }

            await updateAccountLogoAndColors(updateAccountLogoAndColorsDto);

            setAccount({ ...account, logo: logoData, primaryColor, secondaryColor });
            setRefreshAccount(!refreshAccount);
        };
        img.src = logoData;
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            extractColors(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }, [account]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
            'image/svg+xml': ['.svg'],
        },
    });

    return (
        <>
            {
                ( user?.roles.includes('admin') || user?.roles.includes('content-manager') ? (
                    <>
                        <p className="font-semibold py-2">Upload Logo:</p>

                        <div {...getRootProps()} className="flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
                            <input {...getInputProps()} />
                            {account?.logo ? <img src={account?.logo} alt="Uploaded Logo" /> : <p className="text-center p-6">Drag and drop a logo or click to select a file</p>}
                        </div>
                    </>

                ) : (
                    <></>
                ))
            }

            {(account?.logo && account?.primaryColor && account?.secondaryColor) && (
                <div className="mt-4">
                    <p className="font-semibold py-2">Extracted Colors:</p>
                    <div className="flex">
                        <div
                            className="w-1/2 h-10 rounded"
                            style={{ backgroundColor: `${account?.primaryColor}` }}
                        ></div>
                        <div
                            className="w-1/2 h-10 rounded ml-4"
                            style={{ backgroundColor: `${account?.secondaryColor}` }}
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoUpload;

import { getMasksByNames } from '../../../utils/api';
import { MaskDocument } from '@monorepo/type';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';

function BasicSwoosh({ imageFile, currentTheme }) {
    const [maskImages, setMaskImages] = useState<MaskDocument[] | null>(null);
    const [maskBlobUrls, setMaskBlobUrls] = useState<string[]>([]);
    const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
    const [maskImagesElements, setMaskImagesElements] = useState<JSX.Element[]>([]);

    useEffect(() => {
        async function fetchMask() {
            const maskData = await getMasksByNames(['basic-swoosh-short-base-1', 'basic-swoosh-short-base-2']);
            console.log('maskData: ', maskData);

            setMaskImages(maskData);
        }

        if (currentTheme === 'basicSwoosh') {
            fetchMask();
        }
    }, [currentTheme]);

    useEffect(() => {
        if (maskImages) {
            const urls = maskImages.map((mask) => {
                const byteString = atob(mask.maskBase64.split(',')[1]);
                const byteArray = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    byteArray[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([byteArray], { type: 'image/png' });
                return URL.createObjectURL(blob);
            });
            setMaskBlobUrls(urls);
        }

        return () => {
            maskBlobUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [maskImages]);

    useEffect(() => {
        if (imageFile) {
            const imageSrc = URL.createObjectURL(imageFile);
            const img = new window.Image();
            img.src = imageSrc;
            img.onload = () => {
                setBackgroundImage(img);
            };
        }
    }, [imageFile]);

    useEffect(() => {
        if (backgroundImage && maskBlobUrls.length > 0) {
            const loadedMaskImages = maskBlobUrls.map((url, index) => {
                const maskImage = new window.Image();
                maskImage.src = url;
                return new Promise<{ img: HTMLImageElement; index: number }>((resolve) => {
                    maskImage.onload = () => {
                        resolve({ img: maskImage, index });
                    };
                });
            });

            Promise.all(loadedMaskImages).then((images) => {
                setMaskImagesElements(images.map(({ img, index }) => <KonvaImage key={index} image={img} />));
            });
        }
    }, [backgroundImage, maskBlobUrls]);

    if (currentTheme !== 'basicSwoosh' || !imageFile || !maskImages || !backgroundImage) {
        return null;
    }

    return (
        <div className="basic-swoosh w-full h-full relative">
            <div className="w-72 h-72 overflow-hidden" style={{ transformOrigin: '0 0', transform: 'scale(3.6)' }}>
                <Stage width={backgroundImage.width} height={backgroundImage.height}>
                    <Layer>
                        <KonvaImage
                            image={backgroundImage}
                            width={backgroundImage.width}
                            height={backgroundImage.height}
                        />
                        {maskImagesElements}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

BasicSwoosh.propTypes = {
    imageFile: PropTypes.object,
    currentTheme: PropTypes.string.isRequired,
};

export default BasicSwoosh;

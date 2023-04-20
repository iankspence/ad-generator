import { CampaignContext } from '../../../contexts/CampaignContext';
import { Button, Box, Slider } from '@material-ui/core';
import React, { useContext, useState } from 'react';

function BasicSwooshToolbar() {
    const { basicSwooshTheme, updateBasicSwooshTheme } = useContext(CampaignContext);

    const [maskOneOpacityState, setMaskOneOpacityState] = useState(basicSwooshTheme.maskOneOpacity);
    // const [maskTwoOpacityState, setMaskTwoOpacityState] = useState(basicSwooshTheme.maskTwoOpacity);

    return (
        <div className="w-full flex justify-center bg-gray-500 py-2 mb-4">
            <div className="mx-2">
                <span>Mask Opacity</span>
                <Slider
                    value={maskOneOpacityState}
                    onChange={(e, newValue) => setMaskOneOpacityState(newValue as number)}
                    min={0}
                    max={1}
                    step={0.1}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    updateBasicSwooshTheme({ maskOneOpacity: maskOneOpacityState });
                }}
            >
                Apply Changes
            </Button>
        </div>
    );
}

export default BasicSwooshToolbar;

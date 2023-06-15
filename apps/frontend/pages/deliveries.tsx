import React, { useContext, useEffect, useState } from 'react';
import { findAdsByAccountId } from "../utils/api/mongo/ad/findAdsByAccountIdApi";
import UserContext from "../contexts/UserContext";
import { CampaignContext } from "../contexts/CampaignContext";
import LoadingScreen from "../components/loading-screen/LoadingScreen";
import { FindAdsByAccountIdDto } from "@monorepo/type";
import { useUser } from '../hooks/useUser';
import DeliveriesViewer from '../components/deliveries/DeliveriesViewer';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import CropDinRoundedIcon from '@mui/icons-material/CropDinRounded';
import Crop169RoundedIcon from '@mui/icons-material/Crop169Rounded';

export default function Deliveries() {
    const [singleCanvasView, setSingleCanvasView] = useState(true);

    const handleCanvasViewToggle = (event, viewMode) => {
        setSingleCanvasView(Boolean(viewMode));
    }

    const { account } = useContext(UserContext);
    const { ads, updateAds } = useContext(CampaignContext);

    useUser();

    useEffect(() => {
        const fetchAds = async () => {
            const findAdsByAccountIdDto: FindAdsByAccountIdDto = {
                accountId: account?._id.toString(),
            }
            const ads = await findAdsByAccountId(findAdsByAccountIdDto)
            const deliveredAds = ads.filter(ad => ad.adStatus === 'delivered');
            updateAds(deliveredAds);
        };
        fetchAds();
    }, [account]);

    if (!account) return <LoadingScreen />;

    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            <div style={{ color: '#000', backgroundColor: '#fff' }}>
                <ToggleButtonGroup value={singleCanvasView} exclusive onChange={handleCanvasViewToggle} size="small">
                    <ToggleButton value="false" aria-label="four-canvas">
                        <Crop169RoundedIcon />
                    </ToggleButton>
                    <ToggleButton value="true" aria-label="single-canvas">
                        <CropDinRoundedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div style={{ flexGrow: 1, padding: 8 }}>
                <DeliveriesViewer ads={ads} singleCanvasView={singleCanvasView} toggleCanvasView={handleCanvasViewToggle} />
            </div>
        </div>
    );
}

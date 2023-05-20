import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PixiContext } from "../contexts/PixiContext";
import { getAdsByAccountId } from "../utils/api";
import UserContext from "../contexts/UserContext";
import {CampaignContext} from '../contexts/CampaignContext';

const useEditStageChildren = (appRef, canvasName) => {
    const { editAdId, updateBackgroundImageLocation, updateUserControlledAttributes } = useContext(PixiContext);
    const { account } = useContext(UserContext);
    const router = useRouter();
    const [ads, setAds] = useState([]);

    const { hooks, updateHooks, hookPosition, updateHookPosition } = useContext(CampaignContext);

    const getUserControlledAttributes = (ads, editAdId, canvasName) => {
        const ad = ads.find(ad => ad._id.toString() === editAdId);
        if (!ad) return null;

        return ad.userControlledAttributes.find(attribute => attribute.canvasName === canvasName);
    };

    useEffect(() => {
        if (!account?._id) return;
        const fetchAds = async () => {
            const ads = await getAdsByAccountId(account._id);
            setAds(ads);
        };
        fetchAds();
    }, [router.pathname, account?._id]);

    useEffect(() => {
        if (!appRef.current || !editAdId || !ads) return;

        const userControlledAttributes = getUserControlledAttributes(ads, editAdId, canvasName);
        if (!userControlledAttributes) return;

        updateUserControlledAttributes(userControlledAttributes);
        updateBackgroundImageLocation(userControlledAttributes.imageControls.location); // trigger useImage



    }, [router.pathname, editAdId, ads]);
};

export default useEditStageChildren;

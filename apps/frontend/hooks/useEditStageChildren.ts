import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PixiContext } from "../contexts/PixiContext";
import { getAdsByAccountId } from "../utils/api";
import UserContext from "../contexts/UserContext";
import { UserControlledAttribute} from "@monorepo/type";

const useEditStageChildren = (appRef, canvasName) => {
    const { editAdId, updateBackgroundImageLocation, updateUserControlledAttributes } = useContext(PixiContext);
    const { account } = useContext(UserContext);
    const router = useRouter();
    const [ads, setAds] = useState([]);

    const getUserControlledAttributes = (ads, editAdId, canvasName): null | UserControlledAttribute => {
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

        const canvasUserControlledAttributes = getUserControlledAttributes(ads, editAdId, canvasName);
        if (!canvasUserControlledAttributes) return;

        updateUserControlledAttributes(prevUserControlledAttributes => {
            let updatedAttributes: UserControlledAttribute[];

            const existingIndex = prevUserControlledAttributes.findIndex(attribute => attribute.canvasName === canvasName);
            if (existingIndex > -1) {
                // Replace existing attributes for this canvas
                updatedAttributes = [...prevUserControlledAttributes];
                updatedAttributes[existingIndex] = canvasUserControlledAttributes;
            } else {
                // Append new attributes for this canvas
                updatedAttributes = [...prevUserControlledAttributes, canvasUserControlledAttributes];
            }

            // Only update the background image location if there are 4 userControlledAttributes
            if (updatedAttributes.length === 4) {
                updateBackgroundImageLocation(canvasUserControlledAttributes.imageControls.location); // trigger useImage
            }

            return updatedAttributes;
        });
    }, [router.pathname, editAdId, ads]);

};

export default useEditStageChildren;

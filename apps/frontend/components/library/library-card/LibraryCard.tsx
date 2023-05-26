import React, { useContext, useState } from 'react';
import { Card, CardMedia, IconButton } from '@material-ui/core';
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CampaignContext } from "../../../contexts/CampaignContext";
import LibraryCardButtonGroup from "./LibraryCardButtonGroup";
import {copyAd, deleteAd} from '../../../utils/api'
import {PixiContext} from "../../../contexts/PixiContext";
import {useRouter} from "next/router";

const LibraryCard = ({ ad, cardLocation, refreshAds }) => {
    const { selectedAds, updateSelectedAds } = useContext(CampaignContext);
    const { updateEditAd, updateBackgroundImageLocation, updateFreezeEditAdAttributes, updateShowFreezeEditAttributeButton } = useContext(PixiContext)
    const router = useRouter();


    const handleCopyClick = async (event) => {
        event.stopPropagation();

        if (window.confirm("Are you sure you want to copy this ad?")) {
            try {
                await copyAd(ad._id);
                refreshAds();
            } catch (error) {
                alert("Failed to copy ad. Please try again later.");
            }
        }
    };

    const handleDeleteClick = async (event) => {
        event.stopPropagation();

        if (window.confirm("Are you sure you want to delete this ad? This can't be undone!")) {
            try {
                await deleteAd(ad._id);
                refreshAds();
            } catch (error) {
                alert("Failed to delete ad. Please try again later.");
            }
        }
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to edit this ad?")) {
            try {
                updateEditAd(ad);
                updateBackgroundImageLocation('');
                updateFreezeEditAdAttributes(true)
                updateShowFreezeEditAttributeButton(true)
                router.push('/campaign');
            } catch (error) {
                alert("Failed to delete ad. Please try again later.");
            }
        }
    };

    const handleCardClick = () => {
        if (isSelected(ad)) {
            updateSelectedAds(selectedAds.filter(selectedAd => selectedAd._id !== ad._id));
        } else {
            updateSelectedAds([...selectedAds, ad]);
        }
    };

    const isSelected = (ad) => {
        return selectedAds.some(selectedAd => selectedAd._id === ad._id);
    };

    return (
        <Card
            style={{
                maxWidth: "99%",
                maxHeight: "1000px",
                objectFit: "contain",
                outline: isSelected(ad) ? '5px solid green' : 'none'
            }}
        >
            <div
                style={{position: 'relative'}}
            >
                <CardMedia
                    onClick={handleCardClick}
                    component="img"
                    image={cardLocation}
                    alt={ad?.copyTextEdited || ad?.copyText}
                />

                <>
                    <IconButton
                        onClick={handleEditClick}
                        style={{padding: '0', position: 'absolute', top: '2%', right: '33%', opacity: '30%'}}
                        aria-label="edit"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleDeleteClick}
                        style={{padding: '0', position: 'absolute', top: '2%', right: '2%', opacity: '30%'}}
                        aria-label="delete"
                    >
                        <HighlightOffOutlinedIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleCopyClick}
                        style={{padding: '0', position: 'absolute', top: '2%', right: '17%', opacity: '30%'}}
                        aria-label="copy"
                    >
                        <ContentCopyOutlinedIcon />
                    </IconButton>
                </>

            </div>
            <LibraryCardButtonGroup ad={ad} isSelected={isSelected} />
        </Card>
    );
};

export default LibraryCard;
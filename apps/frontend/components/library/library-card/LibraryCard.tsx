import React, { useContext, useState } from 'react';
import { Card, CardMedia, IconButton } from '@material-ui/core';
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CampaignContext } from "../../../contexts/CampaignContext";
import LibraryCardButtonGroup from "./LibraryCardButtonGroup";

const LibraryCard = ({ ad, cardLocation }) => {
    const { selectedAds, updateSelectedAds } = useContext(CampaignContext);

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
                        style={{padding: '0', position: 'absolute', top: '2%', right: '33%', opacity: '30%'}}
                        aria-label="edit"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        style={{padding: '0', position: 'absolute', top: '2%', right: '2%', opacity: '30%'}}
                        aria-label="delete"
                    >
                        <HighlightOffOutlinedIcon />
                    </IconButton>
                    <IconButton
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

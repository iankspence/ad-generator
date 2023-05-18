import React, {useContext} from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { audiences } from "../../../../../utils/constants/audiences";
import {CampaignContext} from "../../../../../contexts/CampaignContext";

const AudienceSelector = ({countTarget}) => {

    const { selectedAudiencePosition, updateSelectedAudiencePosition, reviews, ads } = useContext(CampaignContext);

    const handleChange = (event) => {
        updateSelectedAudiencePosition(event.target.value);
    };

    const getReviewCountByAudience = (reviews, audiencePosition) => {
        return reviews.filter(review => review.bestFitAudience === audiencePosition).length;
    };

    const getAdCountByAudience = (ads, audiencePosition) => {
        return ads.filter(ad => Number(ad.bestFitAudience) === Number(audiencePosition)).length;
    }

    const getAudienceCount = (countTarget, reviews, ads, audiencePosition) => {
        if (countTarget === 'reviews') {
            return getReviewCountByAudience(reviews, audiencePosition);
        }
        if (countTarget === 'ads') {
            return getAdCountByAudience(ads, audiencePosition);
        }
    }

    return (
        <div>
            <FormControl fullWidth variant="outlined" style={{maxWidth: '280px'}}>
                <InputLabel htmlFor="audience-selector">Audience</InputLabel>
                <Select
                    label="Audience"
                    value={selectedAudiencePosition}
                    onChange={handleChange}
                    inputProps={{ name: 'audience', id: 'audience-selector' }}
                >
                    {audiences.map((audience, index) => (
                        <MenuItem key={audience.name} value={index + 1} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left'}}>
                            <Typography align="left">
                                [{getAudienceCount(countTarget, reviews, ads, index + 1)}] {audience.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>

    );
};

export default AudienceSelector;

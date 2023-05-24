import React, {useContext} from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { audiences } from "../../../../../utils/constants/audiences";
import {CampaignContext} from "../../../../../contexts/CampaignContext";

const AudienceSelector = ({countTarget}) => {

    const { selectedAudiencePosition, updateSelectedAudiencePosition, reviews, ads } = useContext(CampaignContext);

    const handleChange = (event) => {
        updateSelectedAudiencePosition(event.target.value);
    };

    const getAudienceCount = (countTarget, reviews, ads, audiencePosition) => {
        if (countTarget === 'reviews') {
            return reviews.filter(review => Number(review.bestFitAudience) === Number(audiencePosition)).length;
        }
        if (countTarget === 'ads-fresh') {
            return ads.filter(ad => (Number(ad.bestFitAudience) === Number(audiencePosition) && (ad.adStatus === 'fresh'))).length;
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

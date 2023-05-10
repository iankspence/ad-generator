import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AudienceSelector = ({ audiences, selectedAudiencePosition, updateSelectedAudiencePosition, reviews }) => {

    const handleChange = (event) => {
        updateSelectedAudiencePosition(event.target.value);
    };

    const getReviewCountByAudience = (reviews, audiencePosition) => {
        return reviews.filter(review => review.bestFitAudience === audiencePosition).length;
    };

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="audience-selector">Audience</InputLabel>
            <Select
                label="Audience"
                value={selectedAudiencePosition}
                onChange={handleChange}
                inputProps={{ name: 'audience', id: 'audience-selector' }}
            >
                {audiences.map((audience, index) => (
                    <MenuItem key={audience.name} value={index + 1}>
                        [{getReviewCountByAudience(reviews, index + 1)}] {audience.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AudienceSelector;

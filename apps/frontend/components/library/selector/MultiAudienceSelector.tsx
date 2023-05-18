import React, { useContext, useMemo } from "react";
import { useTheme, Chip, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { CampaignContext } from "../../../contexts/CampaignContext";

const MultiAudienceSelector = ({ audiences, selectedAudiences, setSelectedAudiences }) => {
    const theme = useTheme();
    const { ads } = useContext(CampaignContext);

    const getAdCountByAudience = (ads, audiencePosition) => {
        return ads.filter(ad => Number(ad.bestFitAudience) === Number(audiencePosition)).length;
    }

    const handleChange = (event) => {
        setSelectedAudiences(event.target.value);
    };

    // Pre-compute menu items
    const menuItems = useMemo(() => {
        return audiences.map((audience, index) => {
            const adCount = getAdCountByAudience(ads, index + 1);
            return (
                <MenuItem key={audience.name} value={audience.name}>
                    [{adCount}] {audience.name}
                </MenuItem>
            );
        });
    }, [audiences, ads]);
    // Pre-compute render values for Select
    const renderValues = useMemo(() => {
        return selectedAudiences.map((value) => {
            const index = audiences.findIndex(audience => audience.name === value);
            const adCount = getAdCountByAudience(ads, index + 1);
            return { value, label: `[${adCount}] ${value}` };
        });
    }, [selectedAudiences, audiences, ads]);

    return (
        <FormControl variant="outlined" fullWidth key={selectedAudiences.join()}>
            <InputLabel id="audiences-label">Audiences</InputLabel>
            <Select
                labelId="audiences-label"
                multiple
                value={selectedAudiences}
                onChange={handleChange}
                renderValue={(selected) => (
                    <div>
                        {(selected as string[]).map((value) => {
                            const renderValue = renderValues.find(rv => rv.value === value);
                            return <Chip key={value} label={renderValue?.label || value} style={{margin: theme.spacing(0.5)}}/>
                        })}
                    </div>
                )}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
};

export default MultiAudienceSelector;

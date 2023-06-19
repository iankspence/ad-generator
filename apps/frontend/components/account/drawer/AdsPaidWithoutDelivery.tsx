import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { updateAdsPaidWithoutDelivery } from '../../../utils/api/mongo/account/updateAdsPaidWithoutDeliveryApi';

const AdsPaidWithoutDelivery = ({ account, refreshAccount, setRefreshAccount }) => {

    const initialCount = account.adsPaidWithoutDelivery || 0;
    const [count, setCount] = useState(initialCount);

    const handleCountChange = (event) => {
        setCount(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            await updateAdsPaidWithoutDelivery({
                accountId: account._id.toString(),
                adsPaidWithoutDelivery: count,
            });
            setRefreshAccount(!refreshAccount);
        } catch (error) {
            console.error("Failed to update Ads Paid Without Delivery. Please try again later.", error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
                value={count}
                onChange={handleCountChange}
                style={{ marginLeft: '5px', marginRight: '5px', fontSize: '12px', flex: '1 0 auto', height: '26px', width: '80px' }}
            >
                {[...Array(21).keys()].map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
};

export default AdsPaidWithoutDelivery;

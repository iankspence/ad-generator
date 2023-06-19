import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { updateAdsPaidWithoutDelivery } from '../../../utils/api/mongo/account/updateAdsPaidWithoutDeliveryApi';

const AdsPaidWithoutDelivery = ({ account, refreshAccount, setRefreshAccount }) => {
    const initialCount = account.adsPaidWithoutDelivery || 0;
    const [count, setCount] = useState(initialCount);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
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
        <div>
            <TextField value={count} disabled />
            <Button onClick={handleIncrement}>Increment</Button>
            <Button onClick={handleDecrement}>Decrement</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
};

export default AdsPaidWithoutDelivery;

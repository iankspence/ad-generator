import { Autocomplete, TextField } from '@mui/material';
import { AccountDocument } from "@monorepo/type";
import { useState } from 'react';

const AccountSelector = ({ account, setAccount, accounts }) => {
    const [value, setValue] = useState<AccountDocument | null>(null);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setAccount(newValue);
                const newIndex = accounts.findIndex(account => account._id === newValue._id);
                sessionStorage.setItem('accountIndex', newIndex.toString());
            }}
            options={accounts}
            groupBy={(option) => `${option.country}, ${option.provinceState}, ${option.city}`}
            getOptionLabel={(option) => {
                let label = option.companyName;
                if (option.adsPaidWithoutDelivery > 0) {
                    label += ` (${option.adsPaidWithoutDelivery} ads paid without delivery)`;
                }
                return label;
            }}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Account" variant="outlined" />}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderOption={(props, option, state) => (
                <li {...props} style={{backgroundColor: option.adsPaidWithoutDelivery ? 'orange' : undefined}}>
                    {option.companyName}{option.adsPaidWithoutDelivery > 0 && ` (${option.adsPaidWithoutDelivery} ads paid without delivery)`}
                </li>
            )}
        />
    );
}

export default AccountSelector;

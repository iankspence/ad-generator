import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { AccountDocument } from "@monorepo/type";
import { useEffect, useState } from 'react';

const SelectAccount = ({ account, setAccount, accounts }) => {
    const [value, setValue] = useState<AccountDocument | null>(null);

    useEffect(() => {
        if (accounts && account?._id) {
            const matchingAccount = accounts?.find(a => a._id === account?._id);
            setValue(matchingAccount || null);
        }
    }, [account, accounts]);

    if (!accounts) {
        return <div className="py-8" ></div>;
    }

    accounts?.sort((a, b) => {
        const aKey = `${a.country}, ${a.provinceState}, ${a.city}`;
        const bKey = `${b.country}, ${b.provinceState}, ${b.city}`;
        return aKey.localeCompare(bKey);
    });

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setAccount(newValue);
            }}
            options={accounts}
            groupBy={(option) => `${option.country}, ${option.provinceState}, ${option.city}`}
            getOptionLabel={(option) => option.companyName}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Account" variant="outlined" />}
            isOptionEqualToValue={(option, value) => option._id === value._id}
        />
    );
}

export default SelectAccount;

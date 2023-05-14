import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { getAccounts } from "../../utils/api";
import { AccountDocument } from "@monorepo/type";
import { useEffect, useState } from 'react';

export function SelectAccount({ userId, account, setAccount, accounts, setAccounts }) {
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState<AccountDocument | null>(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            setIsLoading(true);
            const allAccounts = await getAccounts(userId);
            setAccounts(allAccounts);
            setIsDataFetched(true);
            setIsLoading(false);
        };
        fetchAccounts();
    }, [userId]);

    useEffect(() => {
        if (isDataFetched) {
            const matchingAccount = accounts.find(a => a._id === account?._id);
            setValue(matchingAccount || null);
        }
    }, [account, accounts, isDataFetched]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    accounts.sort((a, b) => {
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
            isOptionEqualToValue={(option, value) => option._id === value._id} // Add this line
        />
    );
}
export default SelectAccount;

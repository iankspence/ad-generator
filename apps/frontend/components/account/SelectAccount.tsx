import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { getAccounts } from "../../utils/api/mongo/account/getAccountsApi";
import { AccountDocument } from "@monorepo/type";
import { useContext, useEffect, useState } from 'react';
import { findAccountsByManagerId } from '../../utils/api/mongo/account/findAccountsByManagerIdApi';
import UserContext from '../../contexts/UserContext';

export function SelectAccount({ userId, account, setAccount, accounts, setAccounts }) {
    const [value, setValue] = useState<AccountDocument | null>(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchAccounts = async () => {

            if (!user || !user.roles) return;

            if (user.roles.includes('content-manager')) {

                const accounts = await findAccountsByManagerId({
                    managerUserId: user._id.toString(),
                })
                console.log('accounts: ', accounts)
                if (accounts.length > 0) {
                    setAccounts(accounts);
                    setIsDataFetched(true);
                }
                return;
            }

            if ( user.roles.includes('admin') ) {
                const accounts = await getAccounts();
                if (accounts.length > 0) {
                    setAccounts(accounts);
                    setIsDataFetched(true);
                }
                return;
            }


        };
        fetchAccounts();
    }, [user, userId]);

    useEffect(() => {
        if (isDataFetched) {
            const matchingAccount = accounts?.find(a => a._id === account?._id);
            setValue(matchingAccount || null);
        }
    }, [account, accounts, isDataFetched]);

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

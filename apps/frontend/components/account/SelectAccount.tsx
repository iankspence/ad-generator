import { Select, MenuItem } from '@material-ui/core';
import {getAccounts} from "../../utils/api";
import {AccountDocument} from "@monorepo/type";
import { useEffect, useState } from 'react';

export function SelectAccount({ userId, account, setAccount }) {
    const [accounts, setAccounts] = useState<AccountDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            setIsLoading(true);
            const allAccounts = await getAccounts(userId);
            setAccounts(allAccounts);
            setIsLoading(false);
        };
        fetchAccounts();
    }, [userId]);

    const handleChange = (event) => {
        const selectedAccountId = event.target.value;
        const selectedAccount = accounts.find((acc) => acc._id.toString() === selectedAccountId);
        setAccount(selectedAccount);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Replace this with your actual loading indicator
    }

    return (
        <Select value={account?._id?.toString() || ''} onChange={handleChange}>
            {accounts.map(acc => (
                <MenuItem key={acc._id.toString()} value={acc._id.toString()}>
                    {acc.companyName}
                </MenuItem>
            ))}
        </Select>
    );
}
export default SelectAccount;

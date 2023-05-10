import { getAccountByUserId } from '../utils/api';
import { AccountDocument } from '@monorepo/type';
import { useEffect, useState } from 'react';

const useAccount = (userId: string) => {
    const [account, setAccount] = useState<AccountDocument | null>(null);

    useEffect(() => {
        if (userId) {
            getAccountByUserId(userId).then((fetchedAccount) => {
                setAccount(fetchedAccount);
            });
        }
    }, [userId]);

    return { account, setAccount };
};

export default useAccount;

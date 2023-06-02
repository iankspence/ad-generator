import React, {useContext, useEffect, useState} from 'react';
import { updateAccountManager } from "../../utils/api/mongo/account/updateAccountManagerApi";
import { findUnassignedAccounts } from "../../utils/api/mongo/account/findUnassignedAccountsApi";
import UserContext from "../../contexts/UserContext";

export function UnassignedAccountPicker() {
    const [unassignedAccounts, setUnassignedAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [promptMessage, setPromptMessage] = useState("");
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchUnassignedAccounts = async () => {
            const fetchedAccounts = await findUnassignedAccounts();
            setUnassignedAccounts(fetchedAccounts);
        };

        if(user && (user.roles.includes('admin') || user.roles.includes('content-manager')) ) {
            fetchUnassignedAccounts();
        }
    }, [user]);

    const handleAccountSelection = async (accountId) => {
        if(window.confirm('Do you want to take assignment for this account?')) {
            const selected = unassignedAccounts.find(account => account._id.toString() === accountId.toString());
            setSelectedAccount(selected);

            if(user && (user.roles.includes('admin') || user.roles.includes('content-manager')) ) {
                await updateAccountManager({
                    accountId,
                    managerUserId: user._id.toString(),
                });
                const refreshedAccounts = await findUnassignedAccounts();
                setUnassignedAccounts(refreshedAccounts);

            }
        }
    };

    if(user && (user.roles.includes('admin') || user.roles.includes('content-manager')) && unassignedAccounts.length > 0) {
        return (
            <div className="border-2 border-gray-300 p-4 rounded-md bg-white shadow-lg overflow-y-auto max-h-64">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Account Assignment</h2>
                <div className="space-y-2">
                    {unassignedAccounts.map(account => (
                        <button
                            key={account._id}
                            onClick={() => handleAccountSelection(account._id)}
                            className="bg-gray-100 rounded-md w-full p-2 hover:bg-gray-200 transition-colors duration-200"
                        >
                            {account.companyName} - {account.country} - {account.provinceState} - {account.city}
                        </button>
                    ))}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default UnassignedAccountPicker;

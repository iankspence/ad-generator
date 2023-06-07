import React, { useContext, useState } from 'react';
import TopNav from '../components/top-nav/TopNav';
import UserContext from '../contexts/UserContext';
import NewAccountForm from "../components/account/NewAccountForm";
import AccountInfo from "../components/account/AccountInfo";
import SelectAccount from "../components/account/SelectAccount";
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import NoAccess from '../components/loading-screen/NoAccess';
import { useUser } from '../hooks/useUser';
import { deleteAccount } from '../utils/api/mongo/account/deleteAccountApi';
import UnassignedAccountPicker from '../components/account/UnassignedAccountPicker';
import useAccounts from '../hooks/useAccounts';
import createCheckoutSession from '../utils/api/mongo/customer/createCheckoutSessionApi';
import { Dialog, DialogTitle, Switch, Grid, DialogContent, FormControlLabel } from '@mui/material';
import { PricingData, pricingData } from '../utils/constants/pricingData';
import { PricingCard } from '../components/pricing/PricingCard';

export function AccountPage() {
    const { user, account, setAccount } = useContext(UserContext);
    const { accounts, refreshAccount, setRefreshAccount } = useAccounts();
    const [annualPayment, setAnnualPayment] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    useUser();

    const handleConnectPayment = async (annualPayment: boolean, price: PricingData) => {
        try {
            const priceId = annualPayment ? price.annualPriceId : price.monthlyPriceId;
            await createCheckoutSession({
                accountId: account._id.toString(),
                priceId,
            });
            console.log('Successfully connected payment.');
        } catch (error) {
            alert('Failed to connect payment. Please try again later.');
        }
    };

    const handleToggle = () => {
        setAnnualPayment(!annualPayment);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete this account? This operation cannot be undone.")) {
            try {
                await deleteAccount({
                    accountId: account._id.toString(),
                });
                setRefreshAccount(!refreshAccount); // force to re-fetch the accounts
            } catch (error) {
                console.error("Failed to delete account. Please try again later.", error);
            }
        }
    };

    if (!user || !user?.roles) {
        return <LoadingScreen />;
    }

    if (!user?.roles.includes('admin') && !user?.roles.includes('content-manager') && !user?.roles.includes('client')) {
        return <NoAccess />;
    }

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">
                    { (user.roles.includes('admin') || user.roles.includes('content-manager')) ?
                        <div className="pb-8">
                            <h1 className="text-3xl font-semibold">Account</h1>
                            <p className="font-semibold py-2">Select Account:</p>
                            <div className="py-2"></div>
                            <div className="flex justify-between">
                                <SelectAccount
                                    account={account}
                                    setAccount={setAccount}
                                    accounts={accounts}
                                />
                                <NewAccountForm
                                    userId={user?._id}
                                    refreshAccount={refreshAccount}
                                    setRefreshAccount={setRefreshAccount}
                                />
                            </div>
                            <UnassignedAccountPicker />
                            {user.roles.includes('admin') && (
                                <div className="pt-2 text-right">
                                    <button
                                        onClick={handleDeleteAccount}
                                        className={`text-sm underline ${account ? 'text-red-500' : 'text-gray-500'}`}
                                        disabled={!account}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            )}
                        </div>

                        : <></>
                    }
                    {user.roles.includes('client') && (
                        <button onClick={handleOpenModal}>Connect Payment</button>
                    )}
                    <Dialog open={openModal} onClose={handleCloseModal}>
                        <DialogTitle>Select a Plan</DialogTitle>
                        <DialogContent>
                            <FormControlLabel
                                control={<Switch checked={annualPayment} onChange={handleToggle} />}
                                label="Annual Payment"
                            />
                            <Grid container justifyContent="center" spacing={2}>
                                {pricingData.map((price: PricingData, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={4}>
                                        <PricingCard
                                            price={price}
                                            annualPayment={annualPayment}
                                            buttonText="Select"
                                            onClick={() => handleConnectPayment(annualPayment, price)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>
                    </Dialog>

                    {account && <AccountInfo refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount}/>}
                </div>
            </div>
        </>
    );
}

export default AccountPage;

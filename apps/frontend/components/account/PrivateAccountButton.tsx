import React, { useContext, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SelectAccount from "../account/SelectAccount";
import NewAccountForm from "../account/NewAccountForm";
import UnassignedAccountPicker from '../account/UnassignedAccountPicker';
import LogoUpload from './LogoUpload';
import { deleteAccount } from '../../utils/api/mongo/account/deleteAccountApi';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserContext from '../../contexts/UserContext';
import useAccounts from '../../hooks/useAccounts';

const PrivateAccountButton = () => {
    const { user, account, setAccount } = useContext(UserContext);
    const { accounts, refreshAccount, setRefreshAccount } = useAccounts();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleAdminDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete this account? This operation cannot be undone.")) {
            try {
                await deleteAccount({
                    accountId: account._id.toString(),
                });
                setRefreshAccount(!refreshAccount);
            } catch (error) {
                console.error("Failed to delete account. Please try again later.", error);
            }
        }
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box>
            <div className="fixed top-12 left-8 z-10 bg-reviewDrumMedGray hover:gray-100 rounded-full">
                <IconButton
                    onClick={handleDrawerOpen}
                    className="text-reviewDrumDarkGray"
                >
                    <AssignmentIndIcon />
                </IconButton>
            </div>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        width: '362px',
                        padding: 2,
                    },
                }}
                componentsProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'transparent',
                        },
                    },
                }}

            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Admin Access
                    </Typography>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Select Account</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectAccount
                                account={account}
                                setAccount={setAccount}
                                accounts={accounts}
                            />
                        </AccordionDetails>
                    </Accordion>

                    {account && (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Upload Logo</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <LogoUpload refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount}/>
                            </AccordionDetails>
                        </Accordion>
                    )}

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Create New Account</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <NewAccountForm
                                userId={user._id.toString()}
                                refreshAccount={refreshAccount}
                                setRefreshAccount={setRefreshAccount}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Delete Current Account (admin)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <button
                                onClick={handleAdminDeleteAccount}
                                className={`text-sm underline text-red-500`}
                                disabled={!account}
                            >
                                Confirm Delete
                            </button>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Client Account Assignment</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <UnassignedAccountPicker />
                        </AccordionDetails>
                    </Accordion>


                </Box>
            </Drawer>
        </Box>
    );
};

export default PrivateAccountButton;

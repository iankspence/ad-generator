import React, { useState } from 'react';
import { createAccount } from '../../utils/api';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';

export default function NewAccountForm({ userId }) {
    const [open, setOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        companyName: '',
        country: '',
        provinceState: '',
        city: ''
    });

    const handleInputChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    };

    const handleCreateAccount = async () => {
        const accountData = {
            ...newAccount,
            userId,
        };
        try {
            await createAccount(accountData);
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Create New Account
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="companyName"
                        label="Company Name"
                        type="text"
                        fullWidth
                        value={newAccount.companyName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="country"
                        label="Country"
                        type="text"
                        fullWidth
                        value={newAccount.country}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="provinceState"
                        label="Province/State"
                        type="text"
                        fullWidth
                        value={newAccount.provinceState}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        value={newAccount.city}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateAccount} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


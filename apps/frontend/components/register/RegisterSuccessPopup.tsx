import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const RegisterSuccessPopup = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Verification Email Sent</DialogTitle>
            <DialogContent>
                Please check your inbox and follow the instructions to verify your email before proceeding.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegisterSuccessPopup;

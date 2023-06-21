import React from 'react';
import { TextField, Button } from '@mui/material';

const ApplyForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="w-5/6 max-w-sm mx-auto mt-4 bg-white p-8 rounded-lg shadow-lg">
            <TextField
                id="contact-name-field"
                fullWidth
                label="Contact Name"
                name="contactName"
                required
                value={formData.contactName}
                onChange={(event) => handleChange('contactName', event.target.value)}
                autoComplete="false"
            />

            <div className="mb-4"></div>

            <TextField
                id="company-site-field"
                fullWidth
                label="Company Website"
                name="companySite"
                required
                value={formData.companySite}
                onChange={(event) => handleChange('companySite', event.target.value)}
                autoComplete="false"
            />

            <div className="mb-4"></div>

            <TextField
                id="email-field"
                fullWidth
                label="Email"
                name="email"
                required
                type="email"
                value={formData.email}
                onChange={(event) => handleChange('email', event.target.value)}
                autoComplete="false"
            />

            <div className="mb-4"></div>

            <Button type="submit" variant="contained" color="inherit" className="w-full">
                Apply
            </Button>
        </form>
    );
};

export default ApplyForm;

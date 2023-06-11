import TopNav from '../components/nav-bars/TopNav';
import { forgotPassword } from '../utils/api/mongo/user/forgot-password/forgotPasswordApi';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Link from 'next/link';
import BottomNav from '../components/nav-bars/BottomNav';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            alert('Reset password email sent');
        } catch (error) {
            alert('Error sending reset password email');
        }
    };

    return (
        <div>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold text-reviewDrumDarkGray">Forgot Your Password</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-4 bg-white p-8 rounded-lg shadow-lg">
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="false"
                    />

                    <div className="mb-4"></div>

                    <Button type="submit" variant="contained" color="inherit" className="w-full">
                        Reset Password
                    </Button>

                    <div className="mt-6 text-center">
                        <Link href="/sign-in" className="underline text-blue-500 hover:text-blue-700">
                            Back to Sign In
                        </Link>
                    </div>
                </form>
            </div>
            <BottomNav />
        </div>
    );
}

export default ForgotPasswordPage;

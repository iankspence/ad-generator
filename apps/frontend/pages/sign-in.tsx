import TopNav from '../components/top-nav/TopNav';
import UserContext from '../contexts/UserContext';
import { signIn } from '../utils/api/mongo/user/sign-in/signInApi';
import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link'; // Importing Link from next/link

export function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        setPasswordFieldType(showPassword ? "text" : "password");
    }, [showPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signIn(email, password);
            setUser(user);
            await Router.push('/reviews');
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    };

    return (
        <div>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold text-reviewDrumDarkGray">Sign In</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-4 bg-white p-8 rounded-lg shadow-lg">

                    <div className="mb-4 text-center">
                        <span>No account? </span>
                        <Link href="/register" className="underline text-blue-500 hover:text-blue-700">
                            Register
                        </Link>
                    </div>

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

                    <TextField
                        fullWidth
                        label="Password"
                        type={passwordFieldType}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        autoComplete="false"
                    />

                    <div className="mb-4"></div>

                    <Button type="submit" variant="contained" color="inherit" className="w-full">
                        Sign In
                    </Button>
                    <div className="mt-6 text-center">
                        <Link href="/forgot-password" className="underline text-blue-500 hover:text-blue-700">
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;

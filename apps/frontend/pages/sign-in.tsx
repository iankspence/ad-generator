import React, { useState, useContext } from 'react';
import Link from 'next/link';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import Router from "next/router";
import {signIn} from "../utils/api";

export function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signIn(email, password);
            localStorage.setItem('userToken', data.token);
            setUser(data.user);
            await Router.push('/dashboard');
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    };

    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Sign In</h1>
                <div className="mb-4 text-center">
                    <span>No account? </span>
                    <Link href="/register" className="text-blue-500 hover:text-blue-700">
                        Register
                    </Link>
                </div>
                <div className="w-full max-w-md mx-auto">
                    <form className="bg-gray-800 p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Password</label>
                            <div className="relative">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '◯' : '●'}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 w-full" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <Link href="/forgot-password" className="text-blue-500 hover:text-blue-700">
                            Forgot your password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;

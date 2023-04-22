import TopNav from '../components/TopNav';
import { forgotPassword } from '../util/api';
import Link from 'next/link';
import React, { useState } from 'react';

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
            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Forgot Your Password</h1>
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
                        <div className="mt-4">
                            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 w-full" type="submit">
                                Reset Password
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <Link href="/sign-in" className="text-blue-500 hover:text-blue-700">
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;

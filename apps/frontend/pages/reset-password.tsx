import TopNav from '../components/top-nav/TopNav';
import { resetPassword } from '../utils/api'; // Import the resetPassword function
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export function ResetPasswordPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        token: '',
        newPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (router.query.resetPasswordToken) {
            setFormData((prevFormData: { newPassword: string; token: string }) => ({
                ...prevFormData,
                token: router.query.resetPasswordToken as string,
            }));
        }
    }, [router.query.resetPasswordToken]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(formData);
            alert('Password reset successfully');
            window.location.href = '/sign-in';
        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Reset Password</h1>
                <div className="w-full max-w-md mx-auto">
                    {errorMessage && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">{errorMessage}</div>}
                    <form className="bg-gray-800 p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold mb-2">New Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={showPassword ? 'text' : 'password'}
                                name="newPassword"
                                minLength={8}
                                required
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <span
                                className="absolute right-3 transform translate-y-1/3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '◯' : '●'}
                            </span>
                        </div>
                        <button type="submit" className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;

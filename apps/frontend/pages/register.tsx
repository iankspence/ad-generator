import React, { useState } from 'react';
import TopNav from "../components/TopNav";
import { register } from '../utils/api';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        clinicName: '',
        name: '',
        phone: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            setShowPopup(true);
            // Redirect to sign-in page after successful registration
            // window.location.href = '/sign-in';
        } catch (error) {
            console.error('Error registering:', error);
            // Show an error message to the user
            setErrorMessage(error.message || 'An error occurred. Please try again later.');
        }
    };

    const closePopupAndRedirect = () => {
        setShowPopup(false);
        // Redirect to sign-in page

        window.location.href = '/sign-in';
    };

    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Register</h1>
                <div className="w-full max-w-md mx-auto">
                    {errorMessage && (
                        <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">
                            {errorMessage}
                        </div>
                    )}
                    <form className="bg-gray-800 p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Clinic Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="clinicName"
                                required
                                value={formData.clinicName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Name (Admin)</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Phone (Admin)</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email (Admin)</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold mb-2">Password (Admin)</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                minLength={8}
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className="absolute right-3 transform translate-y-1/3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? '◯' : '●'}
                        </span>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
                    <div
                        className="absolute inset-0"
                        onClick={closePopupAndRedirect}
                    ></div>
                    <div className="w-full max-w-md mx-auto mt-16 rounded p-6 bg-black text-white shadow-md">
                        <h2 className="text-2xl mb-4">Verification Email Sent</h2>
                        <p>Please check your inbox and follow the instructions to verify your email before proceeding.</p>
                        <button
                            className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 mt-4"
                            onClick={closePopupAndRedirect}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default RegisterPage;

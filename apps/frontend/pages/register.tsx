import Link from 'next/link';
import React, { useState } from 'react';
import TopNav from "../components/TopNav";

export function RegisterPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Register</h1>
                <div className="w-full max-w-md mx-auto">
                    <form className="bg-gray-800 p-6 rounded shadow-md">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Clinic Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Name (Admin)</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Phone (Admin)</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email (Admin)</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" required />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold mb-2">Password (Admin)</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={showPassword ? 'text' : 'password'}
                                minLength={8}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 transform translate-y-1/3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '◯' : '●'}
                            </span>
                        </div>
                        <Link href="/sign-in" className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">Register</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

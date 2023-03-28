import Link from 'next/link';
import React, { useState } from 'react';
import TopNav from "../components/TopNav";
import { useRef } from 'react';

export function SubscribePage() {
    const [subscription, setSubscription] = useState('Practitioner Monthly');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Subscribe</h1>
                <div className="w-full max-w-md mx-auto">
                    <form className="bg-gray-800 p-6 rounded shadow-md">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Clinic Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Admin Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Admin Email</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" required />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold mb-2">Admin Password</label>
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

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="subscription">
                                Subscription
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="subscription"
                                value={subscription}
                                onChange={(e) => setSubscription(e.target.value)}
                            >
                                <option>Practitioner Monthly</option>
                                <option>Practitioner Annual</option>
                                <option>Team Monthly</option>
                                <option>Team Annual</option>
                                <option>Business Monthly</option>
                                <option>Business Annual</option>
                            </select>
                        </div>
                            <Link href="/" className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">Subscribe</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubscribePage;

import React from 'react';
import Link from 'next/link';
import TopNav from "../components/TopNav";

export function PricingPage () {
    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-4">

                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Subscription Options:</h1>
                <div className="flex flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-4 text-center justify-between">
                    {/* Practitioner */}
                    <div className="bg-black p-4 rounded shadow-md flex flex-col lg:w-1/3">
                        <h3 className="text-2xl font-bold">Practitioner</h3>
                        <h3 className="text-2xl font-bold">$89/mo</h3>
                        <div className="mt-4">
                            <Link href="/subscribe" className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-100 text-black">Subscribe</Link>
                        </div>
                        <ul className="list-disc list-inside mt-4">
                            <li>Review Web-Scraper</li>
                            <li>Audience Classifier</li>
                            <li>Content Generator</li>
                            <li>Campaign Manager</li>
                            <li>1 Account</li>
                        </ul>
                    </div>

                    {/* Team */}
                    <div className="bg-black p-4 rounded shadow-md flex flex-col lg:w-1/3">
                        <h3 className="text-2xl font-bold">Team</h3>
                        <h3 className="text-2xl font-bold">$149/mo</h3>
                        <div className="mt-4">
                            <Link href="/subscribe" className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-100 text-black">Subscribe</Link>
                        </div>
                        <p className="pt-4 text-xl">Everything in Practitioner plus:</p>
                        <ul className="list-disc list-inside ">
                            <li>1-4 Accounts</li>
                        </ul>
                    </div>

                    {/* Business */}
                    <div className="bg-black p-4 rounded shadow-md flex flex-col lg:w-1/3">
                        <h3 className="text-2xl font-bold">Business</h3>
                        <h3 className="text-2xl font-bold">$299/mo</h3>
                        <div className="mt-4">
                            <Link href="/subscribe" className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-100 text-black">Subscribe</Link>
                        </div>
                        <p  className="pt-4 text-xl">Everything in Team plus:</p>
                        <ul className="list-disc list-inside">
                            <li>1-8 Accounts</li>
                            <li>Priority Support</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PricingPage;

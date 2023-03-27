import React from 'react';
import Link from 'next/link';

export function LandingPage () {
    return (
        <div className="bg-black min-h-screen text-white px-8 py-12">
            <h1 className="text-6xl font-bold mt-16 mb-48">
                People love you, because you do great work.
            </h1>
            <p className="text-3xl mb-12">
                Your excellence in chiropractic care should be rewarded.
            </p>
            <h2 className="text-3xl mb-4">Get more clients today</h2>

            <div className="flex items-start">

                    <ul className="list-none space-y-2 text-xl">
                        <li className="flex items-center text-2xl">
                            <span className="text-purple mr-2">-</span>
                            <span>cheaper</span>
                        </li>
                        <li className="flex items-center text-2xl">
                            <span className="text-purple mr-2">-</span>
                            <span>better</span>
                        </li>
                        <li className="flex items-center text-2xl">
                            <span className="text-purple mr-2">-</span>
                            <span>faster</span>
                        </li>
                    </ul>

                    <div className="w-1/2"></div>

                <div className="text-3xl bg-purple-700 py-2 px-4 mt-12 rounded-lg text-center font-semibold">
                    <Link href="/learn-how" id="learn-how">
                        Learn How
                    </Link>
                </div>

            </div>
            <h2 className="text-3xl mb-4 mt-4">than with an agency.</h2>

            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h2 className="text-2xl mb-4 mt-24 text-center font-semibold">"Turning Praise to Profits"</h2>
        </div>
    );
}

export default LandingPage;

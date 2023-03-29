import React from 'react';
import Link from 'next/link';
import TopNav from "../components/TopNav";

export function StepsPage () {
    return (
        <div>
            <TopNav />

            <div className="bg-black min-h-screen text-white px-8 py-4">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Launch Your First Ad Campaign:</h1>
                <div className="flex flex-col items-center w-full">
                    <ol className="list-decimal list-inside text-center text-xl">
                        <li className="my-2">Account Setup</li>
                        <li className="my-2">Select/Edit Content</li>
                        <li className="my-2">Launch Campaign</li>
                    </ol>
                </div>

                <hr className="my-4 w-full" />

                <div className="flex flex-col items-left w-full mb-4">
                    <h3 className="text-2xl font-bold">1. Account Setup</h3>
                    <p className="mt-2">The basics.</p>
                    <ul className="list-disc list-inside mt-2 mx-12">
                        <li>Verify email / complete payment</li>
                        <li>Enter links to Facebook/Google/RateMDs</li>
                        <li>Connect ad account</li>
                    </ul>
                </div>

                <hr className="my-4 w-full" />

                <div className="flex flex-col items-left w-full mb-4">
                    <h3 className="text-2xl font-bold">2. Select/Edit Content</h3>
                    <p className="mt-2">Reviews are routinely scraped and classified into 10 audiences. Just select the review-generated creative you like, and edit if you wish!</p>
                    <ul className="list-disc list-inside mt-2 mx-12">
                        <li>View # of reviews per audience</li>
                        <li>Select audience to target</li>
                        <li>Select/edit content for targeted campaign</li>
                    </ul>
                </div>

                <hr className="my-4 w-full" />

                <div className="flex flex-col items-left w-full mb-4">
                    <h3 className="text-2xl font-bold">3. Launch Campaign</h3>
                    <p className="mt-2">Launch your targeted ad campaign.</p>
                    <ul className="list-disc list-inside mt-2 mx-12">
                        <li>Interests are set by audience</li>
                        <li>Review campaign</li>
                        <li>Launch ad campaign</li>
                    </ul>
                </div>

                <hr className="my-4 w-full" />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h2 className="text-2xl mb-4 mt-24 text-center font-semibold">"Turning Praise to Profits"</h2>
            </div>
        </div>
    );
}

export default StepsPage;

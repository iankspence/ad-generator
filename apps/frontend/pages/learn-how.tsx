import TopNav from '../components/TopNav';
import React from 'react';

export function LearnMorePage() {
    return (
        <div>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-12">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h2 className="text-2xl mb-4 mt-24 text-center font-semibold">"Turning Praise to Profits"</h2>
            </div>
        </div>
    );
}

export default LearnMorePage;

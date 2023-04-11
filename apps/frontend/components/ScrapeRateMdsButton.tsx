import { addRateMdsLink, startRobotJob } from '../utils/api';
import { AccountDocument } from '@monorepo/type';
import React, { useState } from 'react';

interface Props {
    userId: string;
    accountId: string;
    setAccount: (account: AccountDocument) => void;
}

export const ScrapeRateMdsButton: React.FC<Props> = ({ userId, accountId, setAccount }) => {
    const [showRateMdsForm, setShowRateMdsForm] = useState(false);
    const [rateMdsLink, setRateMdsLink] = useState('');

    const toggleRateMdsForm = () => {
        setShowRateMdsForm(!showRateMdsForm);
    };
    const handleRateMdsSubmit = async () => {
        if (!accountId || !rateMdsLink) return; // if no account or no link, return

        const confirmationMessage =
            'Submitting this link will run a web scraper to collect all of the reviews on this platform. Do you still want to proceed?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            console.log('Submitting RateMds Link');
            console.log(userId, accountId, process.env.NEXT_PUBLIC_BROWSE_AI_RATE_MDS_HEADER_ROBOT, rateMdsLink);
            try {
                await startRobotJob(
                    userId,
                    accountId,
                    process.env.NEXT_PUBLIC_BROWSE_AI_RATE_MDS_HEADER_ROBOT,
                    rateMdsLink,
                );
                const updatedAccount = await addRateMdsLink({ accountId, rateMdsLink });
                setAccount(updatedAccount);

                // Hide the form after submission
                toggleRateMdsForm();
            } catch (error) {
                console.error('Error updating RateMds Link:', error);
            }
        }
    };

    return (
        <>
            {showRateMdsForm ? (
                <div className="flex justify-between py-2">
                    <input
                        type="text"
                        value={rateMdsLink}
                        onChange={(e) => setRateMdsLink(e.target.value)}
                        className="bg-gray-800 text-white py-2 px-4 rounded"
                    />
                    <button className="bg-red-500 py-2 px-4 rounded hover:bg-red-600" onClick={toggleRateMdsForm}>
                        Hide
                    </button>
                    <button
                        className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-2"
                        onClick={handleRateMdsSubmit}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600" onClick={toggleRateMdsForm}>
                    Add RateMds Link
                </button>
            )}
        </>
    );
};

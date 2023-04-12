import { addGoogleQuery, getGoogleMapsReviews } from '../utils/api';
import { AccountDocument } from '@monorepo/type';
import React, { useState } from 'react';

interface Props {
    userId: string;
    accountId: string;
    setAccount: (account: AccountDocument) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const ScrapeGoogleMapsButton: React.FC<Props> = ({ userId, accountId, setAccount, setIsLoading }) => {
    const [showGoogleQueryForm, setShowGoogleQueryForm] = useState(false);
    const [googleQuery, setGoogleQuery] = useState('');

    const toggleGoogleQueryForm = () => {
        setShowGoogleQueryForm(!showGoogleQueryForm);
    };

    const handleGoogleQuerySubmit = async () => {
        if (!accountId || !googleQuery) return;

        const confirmationMessage =
            'Submitting this query will fetch all of the Google Maps reviews for the specified location. Do you still want to proceed?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            try {
                await getGoogleMapsReviews(userId, accountId, googleQuery);

                const updatedAccount = await addGoogleQuery(accountId, googleQuery);
                console.log('Updated account after adding google query:', updatedAccount);
                setAccount(updatedAccount);
                // Hide the form after submission
                toggleGoogleQueryForm();
                setIsLoading(true);
            } catch (error) {
                console.error('Error fetching Google Maps Reviews:', error);
            }
        }
    };

    return (
        <>
            {showGoogleQueryForm ? (
                <div className="flex justify-between py-2">
                    <input
                        type="text"
                        value={googleQuery}
                        onChange={(e) => setGoogleQuery(e.target.value)}
                        className="bg-gray-800 text-white py-2 px-4 rounded"
                    />
                    <button className="bg-red-500 py-2 px-4 rounded hover:bg-red-600" onClick={toggleGoogleQueryForm}>
                        Hide
                    </button>
                    <button
                        className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-2"
                        onClick={handleGoogleQuerySubmit}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600" onClick={toggleGoogleQueryForm}>
                    Add Google Query
                </button>
            )}
        </>
    );
};

import useLoading from '../hooks/useLoading';
import { addGoogleQuery, getGoogleMapsReviews } from '../utils/api';
import { AccountDocument } from '@monorepo/type';
import React, { useState } from 'react';

interface Props {
    userId: string;
    account: AccountDocument;
    setAccount: (account: AccountDocument) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const ScrapeGoogleMapsButton: React.FC<Props> = ({ userId, account, setAccount, isLoading, setIsLoading }) => {
    const [showGoogleQueryForm, setShowGoogleQueryForm] = useState(false);
    const [googleQuery, setGoogleQuery] = useState('');

    const toggleGoogleQueryForm = () => {
        setShowGoogleQueryForm(!showGoogleQueryForm);
    };

    const handleGoogleQuerySubmit = async () => {
        if (!account || !googleQuery) return;

        const confirmationMessage =
            'Submitting this query will fetch all of the Google Maps reviews for the specified location. Do you still want to proceed?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            try {
                setIsLoading(true);
                await getGoogleMapsReviews(userId, account._id.toString(), googleQuery);

                const updatedAccount = await addGoogleQuery(account._id.toString(), googleQuery);
                console.log('Updated account after adding google query:', updatedAccount);
                setAccount(updatedAccount);
                // Hide the form after submission
                toggleGoogleQueryForm();
            } catch (error) {
                console.error('Error fetching Google Maps Reviews:', error);
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="w-full max-w-7xl bg-reviewDrumDarkGray">
                    {isLoading && (
                        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {account.googleQuery ? (
                        <div className="py-2 text-reviewDrumMedGray">Connected.</div>
                    ) : (
                        <button
                            className="bg-reviewDrumBlue text-reviewDrumLightGray px-4 py-2 rounded hover:bg-blue-600"
                            onClick={toggleGoogleQueryForm}
                        >
                            Connect
                        </button>
                    )}
                    {showGoogleQueryForm && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded">
                                <p className="mb-4 text-reviewDrumDarkGray">
                                    {/* Replace with the paragraph of information */}
                                    Enter a Google search with the name and location of your business.
                                    <br />
                                    <br />
                                    Example:
                                    <br />
                                    XYZ Clinic Calgary Alberta
                                </p>
                                <div className="flex justify-between py-2">
                                    <input
                                        type="text"
                                        value={googleQuery}
                                        onChange={(e) => setGoogleQuery(e.target.value)}
                                        className="bg-gray-800 text-white py-2 px-4 rounded"
                                    />
                                    <button
                                        className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                                        onClick={toggleGoogleQueryForm}
                                    >
                                        Hide
                                    </button>
                                    <button
                                        className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-2"
                                        onClick={handleGoogleQuerySubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ScrapeGoogleMapsButton;

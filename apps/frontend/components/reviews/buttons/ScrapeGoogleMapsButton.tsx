import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AccountDocument, AddGoogleQueryDto, ScrapeGoogleMapsReviewsDto } from '@monorepo/type';
import { addGoogleQuery } from '../../../utils/api/mongo/account/addGoogleQueryApi';
import { getGoogleMapsReviews } from '../../../utils/api/outscraper/getGoogleMapsReviewsApi';

interface Props {
    userId: string;
    account: AccountDocument | Partial<AccountDocument>;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    reviewsLimit: number;
}
export const ScrapeGoogleMapsButton: React.FC<Props> = ({ userId, account, setAccount, isLoading, setIsLoading, reviewsLimit }) => {
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

                const getGoogleMapsReviewsDto: ScrapeGoogleMapsReviewsDto = {
                    userId,
                    accountId: account._id.toString(),
                    query: googleQuery,
                    reviewsLimit: reviewsLimit,
                }

                console.log('getGoogleMapsReviewsDto (button): ', getGoogleMapsReviewsDto)

                await getGoogleMapsReviews(getGoogleMapsReviewsDto);

                const addGoogleQueryDto: AddGoogleQueryDto = {
                    accountId: account._id.toString(),
                    googleQuery,
                }

                const updatedAccount = await addGoogleQuery(addGoogleQueryDto);
                setAccount(updatedAccount);
                toggleGoogleQueryForm();
            } catch (error) {
                console.error('Error fetching Google Maps Reviews:', error);
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            {account.googleQuery ? (
                <Box className="py-2 text-reviewDrumOrange text-xl">Connected.</Box>
            ) : (
                <Button
                    className="bg-reviewDrumMedGray text-md text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={toggleGoogleQueryForm}
                >
                    Connect
                </Button>
            )}
            {showGoogleQueryForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded">
                        <p className="mb-4 text-reviewDrumDarkGray">
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
                                className="bg-reviewDrumDarkGray text-white py-2 px-4 rounded"
                            />
                            <button
                                className="bg-red-500 py-2 px-4 text-white rounded hover:bg-red-600"
                                onClick={toggleGoogleQueryForm}
                            >
                                Hide
                            </button>
                            <button
                                className="bg-reviewDrumMedGray py-2 px-4 text-white rounded hover:bg-reviewDrumDarkGray ml-2"
                                onClick={handleGoogleQuerySubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ScrapeGoogleMapsButton;

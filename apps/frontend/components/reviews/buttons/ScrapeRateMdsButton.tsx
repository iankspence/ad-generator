import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AccountDocument, StartRobotJobDto } from '@monorepo/type';
import { startRobotJob } from '../../../utils/api/browse-ai/startRobotJobApi';
import { addRateMdsLink } from '../../../utils/api/mongo/account/addRateMdsLinkApi';

interface Props {
    userId: string;
    account: AccountDocument | Partial<AccountDocument>;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
export const ScrapeRateMdsButton: React.FC<Props> = ({ userId, account, setAccount, isLoading, setIsLoading }) => {
    const [showRateMdsForm, setShowRateMdsForm] = useState(false);
    const [rateMdsLink, setRateMdsLink] = useState('');

    const toggleRateMdsForm = () => {
        setShowRateMdsForm(!showRateMdsForm);
    };

    const validateLink = (link: string) => {
        const regex = /^https:\/\/.*\.html\/$/;
        return regex.test(link);
    };

    const handleRateMdsSubmit = async () => {
        if (!account || !rateMdsLink) return;

        if (!validateLink(rateMdsLink)) {
            alert('Invalid link. Please ensure it starts with https:// and ends with .html/');
            return;
        }

        const confirmationMessage =
            'Submitting this link will run a web scraper to collect all of the reviews on this platform. Do you still want to proceed?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            setIsLoading(true);
            const accountId = account._id.toString();

            const startRobotJobDto: StartRobotJobDto = {
                userId,
                accountId,
                robotUrl: process.env.NEXT_PUBLIC_BROWSE_AI_RATE_MDS_HEADER_ROBOT,
                inputParameters: {
                    originUrl: rateMdsLink,
                },
            }

            try {
                await startRobotJob(startRobotJobDto);
                const updatedAccount = await addRateMdsLink({ accountId, rateMdsLink });
                setAccount(updatedAccount);
                toggleRateMdsForm();
            } catch (error) {
                console.error('Error updating RateMds Link:', error);
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            {account.rateMdsLinks?.[0] ? (
                <Box className="py-2 text-reviewDrumOrange text-xl">Connected.</Box>
            ) : (
                <Button
                    className="bg-reviewDrumMedGray text-white py-2 px-4 rounded  hover:bg-reviewDrumDarkGray"
                    onClick={toggleRateMdsForm}
                >Connect</Button>
            )}

            {showRateMdsForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded">
                        <p className="mb-4 text-reviewDrumDarkGray">
                            Enter the full link to the RateMDs page you want to connect.
                            <br />
                            <br />
                            Example:
                            <br />
                            https://www.ratemds.com/doctor-ratings/[specific to each doctor].html/
                        </p>
                        <div className="flex justify-between py-2">
                            <input
                                type="text"
                                value={rateMdsLink}
                                onChange={(e) => setRateMdsLink(e.target.value)}
                                className="bg-reviewDrumDarkGray text-white py-2 px-4 rounded"
                            />
                            <button
                                className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 text-white"
                                onClick={toggleRateMdsForm}
                            >
                                Hide
                            </button>
                            <button
                                className="bg-reviewDrumMedGray py-2 px-4 rounded hover:bg-reviewDrumDarkGray ml-2  text-white"
                                onClick={handleRateMdsSubmit}
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

export default ScrapeRateMdsButton;

import UserContext from '../../contexts/UserContext';
import { updateReview } from '../../utils/api';
import { audiences } from '../../utils/constants/audiences';
import { ReviewDocument } from '@monorepo/type';
import React, { useContext, useEffect, useState } from 'react';
import ReviewViewer from './ReviewViewer';
import { CampaignContext } from '../../contexts/CampaignContext';

interface ChangeAudienceButtonProps {
    filteredReviews: ReviewDocument[] | Partial<ReviewDocument>[];
}

const ChangeAudienceButton: React.FC<ChangeAudienceButtonProps> = ({
                                                                       filteredReviews
     }) => {
    const { user } = useContext(UserContext);
    const { reviewPosition, selectedAudiencePosition } = useContext(CampaignContext)
    const [showForm, setShowForm] = useState(false);
    const [newAudiencePosition, setNewAudiencePosition] = useState(0);
    const [newAudienceReasoning, setNewAudienceReasoning] = useState('');

    if (!filteredReviews) return null;

    const review = filteredReviews[reviewPosition - 1];


    // useEffect(() => {
    //     setNewAudiencePosition(parseInt(audience));
    //     setNewAudienceReasoning(audienceReasoning);
    // }, [audience, audienceReasoning]);

    const handleSubmit = async () => {
        if (review.bestFitAudience === newAudiencePosition) {
            alert('The audience is the same as the current one. Please choose a different audience.');
            return;
        }

        if (review.bestFitReasoning === newAudienceReasoning) {
            alert('The reasoning is the same as the current one. Please provide a different reasoning.');
            return;
        }
        if (!newAudienceReasoning) {
            alert('Please provide reasoning for the audience change.');
            return;
        }

        if (newAudienceReasoning.length < 10) {
            alert('Please provide a longer reasoning for the audience change.');
            return;
        }

        const confirmationMessage = 'Are you sure you want to update the audience and reasoning?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            await updateReview(user._id.toString(), review._id.toString(), Number(newAudiencePosition.toString()), newAudienceReasoning);
            setShowForm(false);
        }
    };

    const handleNextAudience = () => {
        setNewAudiencePosition((prevNumber) => (prevNumber % Object.keys(audiences).length) + 1);
    };

    const handlePrevAudience = () => {
        setNewAudiencePosition(
            (prevNumber) => ((prevNumber - 2 + Object.keys(audiences).length) % Object.keys(audiences).length) + 1,
        );
    };

    return (
        <>
            <button
                className="bg-reviewDrumMedGray w-72 text-white py-2 my-6 rounded hover:bg-reviewDrumDarkGray text-xl"
                onClick={() => setShowForm(!showForm)}
            >
                Change Audience
            </button>

            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded">
                        <div className="flex justify-between">
                            <p className="pb-12 text-reviewDrumDarkGray">{review?.reviewText}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <ReviewViewer />
                            <div className="flex items-center">
                                <button
                                    onClick={handlePrevAudience}
                                    className="mr-2 bg-gray-800 text-white py-1 px-2 rounded"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleNextAudience}
                                    className="mr-8 bg-gray-800 text-white py-1 px-2 rounded"
                                >
                                    &gt;
                                </button>
                                <p className="mx-2 text-reviewDrumDarkGray">
                                    {audiences[newAudiencePosition - 1] && audiences[newAudiencePosition - 1].name}
                                </p>

                            <label htmlFor="audienceReasoning" className="font-semibold text-white">
                                Audience Reasoning:
                            </label>
                            <textarea
                                id="audienceReasoning"
                                value={newAudienceReasoning}
                                onChange={(e) => setNewAudienceReasoning(e.target.value)}
                                className="w-full h-24 bg-reviewDrumDarkGray text-white py-2 px-4 rounded"
                            />
                            </div>

                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-reviewDrumMedGray text-white px-4 py-2 mx-4 rounded hover:bg-reviewDrumDarkGray"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        <div className="flex justify-end mt-4"></div>
                    </div>
                </div>
            )}

        </>
    );
};
export default ChangeAudienceButton;

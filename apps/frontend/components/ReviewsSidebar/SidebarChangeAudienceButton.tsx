import UserContext from '../../contexts/UserContext';
import { updateReview } from '../../utils/api';
import { audiences } from '../../utils/audiences';
import { ReviewDocument } from '@monorepo/type';
import React, { useContext, useEffect, useState } from 'react';

interface SidebarChangeAudienceButtonProps {
    audience: string;
    setAudience: (audience: string) => void;
    audienceReasoning: string;
    setAudienceReasoning: (reasoning: string) => void;
    review: ReviewDocument;
    setRefreshReviews: (refresh: boolean) => void;
}

const SidebarChangeAudienceButton: React.FC<SidebarChangeAudienceButtonProps> = ({
    audience,
    setAudience,
    audienceReasoning,
    setAudienceReasoning,
    review,
    setRefreshReviews,
}) => {
    const { user } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [newAudiencePosition, setNewAudiencePosition] = useState(0);
    const [newAudienceReasoning, setNewAudienceReasoning] = useState('');

    useEffect(() => {
        setNewAudiencePosition(parseInt(audience));
        setNewAudienceReasoning(audienceReasoning);
    }, [audience, audienceReasoning]);

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
            setAudience(newAudiencePosition.toString());
            setAudienceReasoning(newAudienceReasoning);
            await updateReview(user._id.toString(), review._id.toString(), newAudiencePosition, newAudienceReasoning);
            setShowForm(false);
            setRefreshReviews(true);
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
                className="bg-reviewDrumBlue text-reviewDrumLightGray px-4 py-2 mt-4 mb-4 rounded hover:bg-blue-600 text-xl"
                onClick={() => setShowForm(!showForm)}
            >
                Change Audience
            </button>

            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-reviewDrumLightGray text-reviewDrumDarkGray p-8 rounded">
                        <div className="flex justify-between">
                            <p className="pb-12">{review?.reviewText}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label htmlFor="audience" className="font-semibold">
                                Audience:
                            </label>
                            <div className="flex items-center">
                                <button onClick={handlePrevAudience} className="mr-2">
                                    &lt;
                                </button>
                                <button onClick={handleNextAudience} className="mr-8">
                                    &gt;
                                </button>
                                <p className="mx-2">
                                    {audiences[newAudiencePosition - 1] && audiences[newAudiencePosition - 1].name}
                                </p>
                            </div>
                            <label htmlFor="audienceReasoning" className="font-semibold">
                                Audience Reasoning:
                            </label>
                            <textarea
                                id="audienceReasoning"
                                value={newAudienceReasoning}
                                onChange={(e) => setNewAudienceReasoning(e.target.value)}
                                className="w-full h-24"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-reviewDrumLightGray py-2 px-4 rounded hover:bg-red-600"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-reviewDrumBlue text-reviewDrumLightGray px-4 py-2 mx-4 rounded hover:bg-blue-600"
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

export default SidebarChangeAudienceButton;

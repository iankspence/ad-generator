import React, { useEffect, useState } from 'react';

const QualityControlPanel = ({ review, onSave }) => {
    // Set up state for input fields and changed status
    const [bestFitPersona, setBestFitPersona] = useState(review.bestFitPersona);
    const [otherMatchingPersonas, setOtherMatchingPersonas] = useState(review.otherMatchingPersonas.join(','));
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        // Reset state when the review prop changes
        setBestFitPersona(review.bestFitPersona);
        setOtherMatchingPersonas(review.otherMatchingPersonas.join(','));
        setIsChanged(false);
    }, [review]);

    const handleSaveReview = () => {
        // Check if user has changed any values
        const changed =
            bestFitPersona !== review.bestFitPersona ||
            otherMatchingPersonas !== review.otherMatchingPersonas.join(',');

        if (changed) {
            // Show confirmation window
            const confirmMessage = `Are you sure you want to make the following changes?\n\nBest Fit Persona: ${
                review.bestFitPersona
            } -> ${bestFitPersona}\nOther Matching Personas: ${review.otherMatchingPersonas.join(
                ',',
            )} -> ${otherMatchingPersonas}`;
            const userConfirmed = window.confirm(confirmMessage);

            if (userConfirmed) {
                onSave({
                    ...review,
                    userQC: true,
                    changedResult: {
                        before: {
                            bestFitPersona: review.bestFitPersona,
                            otherMatchingPersonas: review.otherMatchingPersonas,
                        },
                        after: {
                            bestFitPersona: parseInt(bestFitPersona),
                            otherMatchingPersonas: otherMatchingPersonas.split(',').map((num) => parseInt(num)),
                        },
                    },
                });
            }
        } else {
            // If nothing changed, just update userQC field
            onSave({ ...review, userQC: true });
        }
    };

    return (
        <div className="bg-white p-4 text-black">
            <h2 className="text-xl font-bold mb-4">Quality Control</h2>
            <div className="mb-4">
                <h3 className="font-semibold">Review Text</h3>
                <p>{review.reviewText}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <h3 className="font-semibold">Best Fit</h3>
                    <input
                        type="number"
                        value={bestFitPersona}
                        onChange={(e) => {
                            setBestFitPersona(e.target.value);
                            setIsChanged(true);
                        }}
                        className="bg-gray-100 py-1 px-2 rounded"
                    />
                </div>
                <div>
                    <h3 className="font-semibold">Potential Fits</h3>
                    <input
                        type="text"
                        value={otherMatchingPersonas}
                        onChange={(e) => {
                            setOtherMatchingPersonas(e.target.value);
                            setIsChanged(true);
                        }}
                        className="bg-gray-100 py-1 px-2 rounded w-full"
                    />
                </div>
                <div>
                    <p className={`font-semibold ${isChanged ? 'text-yellow-500' : 'text-gray-400'}`}>Changed</p>
                </div>
            </div>
            <button onClick={handleSaveReview} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Save Review
            </button>
        </div>
    );
};

export default QualityControlPanel;

import React, { useState } from 'react';
import { Card, CardMedia } from '@mui/material';
import DeliveryCardBottomButtonGroup from './DeliveryCardBottomButtonGroup';

const DeliveryCard = ({ ad, cardLocations, refreshAds, initialCard }) => {
    const [currentCard, setCurrentCard] = useState(initialCard || 'hook');

    const handleNext = () => {
        const cards = ['hook', 'claim', 'review', 'close'];
        const currentIndex = cards.indexOf(currentCard);
        if (currentIndex < cards.length - 1) {
            setCurrentCard(cards[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const cards = ['hook', 'claim', 'review', 'close'];
        const currentIndex = cards.indexOf(currentCard);
        if (currentIndex > 0) {
            setCurrentCard(cards[currentIndex - 1]);
        }
    };

    const isNavBtnDisabled = (direction) => {
        const cards = ['hook', 'claim', 'review', 'close'];
        const currentIndex = cards.indexOf(currentCard);
        if ((direction === 'left' && currentIndex === 0) || (direction === 'right' && currentIndex === cards.length - 1)) {
            return true;
        }
        return false;
    };

    return (
        <Card>
            <div>
                <CardMedia
                    component="img"
                    image={`${process.env.NEXT_PUBLIC_CF_DOMAIN}/${cardLocations[currentCard]}`}
                    alt={ad?.copyTextEdited || ad?.copyText}
                />
            </div>
            <DeliveryCardBottomButtonGroup
                ad={ad}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                isNavBtnDisabled={isNavBtnDisabled}
            />
        </Card>
    );
};

export default DeliveryCard;

import React, { useContext, useState } from 'react';
import { Card, CardMedia, IconButton } from '@mui/material';
import DeliveryCardBottomButtonGroup from './DeliveryCardBottomButtonGroup';
import UserContext from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CopyCardsAndAdDto } from '@monorepo/type';
import { copyCardsAndAd } from '../../utils/api/mongo/card/copyCardsAndAdApi';

const DeliveryCard = ({ ad, cardLocations, initialCard }) => {
    const [currentCard, setCurrentCard] = useState(initialCard || 'hook');

    const router = useRouter();
    const { user } = useContext(UserContext);

    const handleCopyClick = async (event) => {
        event.stopPropagation();

        if (window.confirm("Are you sure you want to copy this ad?")) {
            try {
                const copyCardsAndAdDto: CopyCardsAndAdDto = {
                    adId: ad._id,
                }
                await copyCardsAndAd(copyCardsAndAdDto);
            } catch (error) {
                alert("Failed to copy ad. Please try again later.");
            }
        }
    };

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
            {(( user?.roles.includes('admin') || user?.roles.includes('content-manager') ) && router.pathname === '/deliveries' ) &&
                <IconButton
                    onClick={handleCopyClick}
                    style={{padding: '0', position: 'absolute', top: '6%', right: '7%', opacity: '15%'}}
                    aria-label="copy"
                >
                    <ContentCopyOutlinedIcon />
                </IconButton>
            }
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

import {
    defaultClaimArray,
    defaultCloseArray,
    defaultCopyArray,
    defaultHookArray,
    defaultReviewArray,
} from '../utils/constants/contentText';
import { THEME_NAMES } from '../utils/constants/themes';
import { defaultSkyBubblesTheme } from '../utils/constants/themes';
import {
    ClaimDocument,
    CloseDocument,
    CopyDocument,
    HookDocument,
    ReviewDocument,
    SkyBubblesCenterTextTheme,
} from '@monorepo/type';
import { createContext, useState, useCallback } from 'react';

interface CampaignContextProps {
    currentTheme: string;

    copies: CopyDocument[] | Partial<CopyDocument>[];
    updateCopies: (newCopies: CopyDocument[] | Partial<CopyDocument>[]) => void;
    selectedCopy: CopyDocument | Partial<CopyDocument>;
    updateSelectedCopy: (newCopy: CopyDocument | Partial<CopyDocument>) => void;

    hooks: HookDocument[] | Partial<HookDocument>[];
    updateHooks: (newHooks: HookDocument[] | Partial<HookDocument>[]) => void;
    selectedHook: HookDocument | Partial<HookDocument>;
    updateSelectedHook: (newHook: HookDocument | Partial<HookDocument>) => void;

    claims: ClaimDocument[] | Partial<ClaimDocument>[];
    updateClaims: (newClaims: ClaimDocument[] | Partial<ClaimDocument>[]) => void;
    selectedClaim: ClaimDocument | Partial<ClaimDocument>;
    updateSelectedClaim: (newClaim: ClaimDocument | Partial<ClaimDocument>) => void;

    reviews: ReviewDocument[] | Partial<ReviewDocument>[];
    updateReviews: (newReviews: ReviewDocument[] | Partial<ReviewDocument>[]) => void;
    selectedReview: ReviewDocument | Partial<ReviewDocument>;
    updateSelectedReview: (newReview: ReviewDocument | Partial<ReviewDocument>) => void;

    closes: CloseDocument[] | Partial<CloseDocument>[];
    updateCloses: (newCloses: CloseDocument[] | Partial<CloseDocument>[]) => void;
    selectedClose: CloseDocument | Partial<CloseDocument>;
    updateSelectedClose: (newClose: CloseDocument | Partial<CloseDocument>) => void;

    skyBubblesTheme: SkyBubblesCenterTextTheme;
    updateCurrentTheme: (theme: string) => void;
    updateSkyBubblesTheme: (newTheme: Partial<SkyBubblesCenterTextTheme>) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
    currentTheme: THEME_NAMES[0],
    copies: [],
    updateCopies: () => void 0,
    selectedCopy: defaultCopyArray[0],
    updateSelectedCopy: () => void 0,
    hooks: [],
    updateHooks: () => void 0,
    selectedHook: defaultHookArray[0],
    updateSelectedHook: () => void 0,
    claims: [],
    updateClaims: () => void 0,
    selectedClaim: defaultClaimArray[0],
    updateSelectedClaim: () => void 0,
    reviews: [],
    updateReviews: () => void 0,
    selectedReview: defaultReviewArray[0],
    updateSelectedReview: () => void 0,
    closes: [],
    updateCloses: () => void 0,
    selectedClose: defaultCloseArray[0],
    updateSelectedClose: () => void 0,
    skyBubblesTheme: defaultSkyBubblesTheme,
    updateCurrentTheme: () => void 0,
    updateSkyBubblesTheme: () => void 0,
});

const CampaignProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(THEME_NAMES[0]);
    const [copies, setCopies] = useState(defaultCopyArray);
    const [selectedCopy, setSelectedCopy] = useState(defaultCopyArray[0]);
    const [hooks, setHooks] = useState(defaultHookArray);
    const [selectedHook, setSelectedHook] = useState(defaultHookArray[0]);
    const [claims, setClaims] = useState(defaultClaimArray);
    const [selectedClaim, setSelectedClaim] = useState(defaultClaimArray[0]);
    const [reviews, setReviews] = useState(defaultReviewArray);
    const [selectedReview, setSelectedReview] = useState(defaultReviewArray[0]);
    const [closes, setCloses] = useState(defaultCloseArray);
    const [selectedClose, setSelectedClose] = useState(defaultCloseArray[0]);
    const [skyBubblesTheme, setSkyBubblesTheme] = useState(defaultSkyBubblesTheme);

    const updateCurrentTheme = (theme) => {
        setCurrentTheme(theme);
    };

    const updateSkyBubblesTheme = useCallback((newTheme: Partial<SkyBubblesCenterTextTheme>) => {
        setSkyBubblesTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
    }, []);

    return (
        <CampaignContext.Provider
            value={{
                currentTheme,
                copies,
                updateCopies: setCopies,
                selectedCopy,
                updateSelectedCopy: setSelectedCopy,
                hooks,
                updateHooks: setHooks,
                selectedHook,
                updateSelectedHook: setSelectedHook,
                claims,
                updateClaims: setClaims,
                selectedClaim,
                updateSelectedClaim: setSelectedClaim,
                reviews,
                updateReviews: setReviews,
                selectedReview,
                updateSelectedReview: setSelectedReview,
                closes,
                updateCloses: setCloses,
                selectedClose,
                updateSelectedClose: setSelectedClose,
                skyBubblesTheme,
                updateCurrentTheme,
                updateSkyBubblesTheme,
            }}
        >
            {children}
        </CampaignContext.Provider>
    );
};

export { CampaignContext };
export default CampaignProvider;

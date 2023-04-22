import {
    defaultClaimArray,
    defaultCloseArray,
    defaultCopyArray,
    defaultHookArray,
    defaultReviewArray,
} from '../util/constants/contentText';
import { ClaimDocument, CloseDocument, CopyDocument, HookDocument, ReviewDocument } from '@monorepo/type';
import { createContext, useState } from 'react';

interface CampaignContextProps {
    copies: CopyDocument[] | Partial<CopyDocument>[];
    updateCopies: (newCopies: CopyDocument[] | Partial<CopyDocument>[]) => void;
    copyPosition: number;
    updateCopyPosition: (newCopy: number) => void;

    hooks: HookDocument[] | Partial<HookDocument>[];
    updateHooks: (newHooks: HookDocument[] | Partial<HookDocument>[]) => void;
    hookPosition: number;
    updateHookPosition: (newHook: number) => void;

    claims: ClaimDocument[] | Partial<ClaimDocument>[];
    updateClaims: (newClaims: ClaimDocument[] | Partial<ClaimDocument>[]) => void;
    claimPosition: number;
    updateClaimPosition: (newClaim: number) => void;

    reviews: ReviewDocument[] | Partial<ReviewDocument>[];
    updateReviews: (newReviews: ReviewDocument[] | Partial<ReviewDocument>[]) => void;
    reviewPosition: number;
    updateReviewPosition: (newReview: number) => void;

    closes: CloseDocument[] | Partial<CloseDocument>[];
    updateCloses: (newCloses: CloseDocument[] | Partial<CloseDocument>[]) => void;
    closePosition: number;
    updateClosePosition: (newClose: number) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
    copies: [],
    updateCopies: () => void 0,
    copyPosition: 1,
    updateCopyPosition: () => void 0,
    hooks: [],
    updateHooks: () => void 0,
    hookPosition: 1,
    updateHookPosition: () => void 0,
    claims: [],
    updateClaims: () => void 0,
    claimPosition: 1,
    updateClaimPosition: () => void 0,
    reviews: [],
    updateReviews: () => void 0,
    reviewPosition: 1,
    updateReviewPosition: () => void 0,
    closes: [],
    updateCloses: () => void 0,
    closePosition: 1,
    updateClosePosition: () => void 0,
});

const CampaignProvider = ({ children }) => {
    const [copies, setCopies] = useState(defaultCopyArray);
    const [copyPosition, setCopyPosition] = useState(1);
    const [hooks, setHooks] = useState(defaultHookArray);
    const [hookPosition, setHookPosition] = useState(1);
    const [claims, setClaims] = useState(defaultClaimArray);
    const [claimPosition, setClaimPosition] = useState(1);
    const [reviews, setReviews] = useState(defaultReviewArray);
    const [reviewPosition, setReviewPosition] = useState(1);
    const [closes, setCloses] = useState(defaultCloseArray);
    const [closePosition, setClosePosition] = useState(1);

    return (
        <CampaignContext.Provider
            value={{
                copies,
                updateCopies: setCopies,
                copyPosition: copyPosition,
                updateCopyPosition: setCopyPosition,
                hooks,
                updateHooks: setHooks,
                hookPosition: hookPosition,
                updateHookPosition: setHookPosition,
                claims,
                updateClaims: setClaims,
                claimPosition: claimPosition,
                updateClaimPosition: setClaimPosition,
                reviews,
                updateReviews: setReviews,
                reviewPosition: reviewPosition,
                updateReviewPosition: setReviewPosition,
                closes,
                updateCloses: setCloses,
                closePosition: closePosition,
                updateClosePosition: setClosePosition,
            }}
        >
            {children}
        </CampaignContext.Provider>
    );
};

export { CampaignContext };
export default CampaignProvider;

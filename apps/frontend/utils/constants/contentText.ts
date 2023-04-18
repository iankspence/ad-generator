import { HookDocument, ClaimDocument, ReviewDocument, CloseDocument, CopyDocument } from '@monorepo/type';

export const defaultCopyArray: Partial<CopyDocument>[] = [
    {
        copyText: 'This is a copy.',
    },
    {
        copyText:
            'This is the longest copy that I would like to see in the world.  It has some length to it.  This is because it is long.',
    },
];

export const defaultHookArray: Partial<HookDocument>[] = [
    {
        hookText: 'This is a hook.',
    },
    {
        hookText: 'This is the longest hook that I would like to see in the world.',
    },
];

export const defaultClaimArray: Partial<ClaimDocument>[] = [
    {
        claimText: 'This is a claim.',
    },
    {
        claimText: 'This is the longest claim that I would like to see in the world.',
    },
];

export const defaultReviewArray: Partial<ReviewDocument>[] = [
    {
        reviewText: 'This is a review which is not very long.',
    },
    {
        reviewText:
            'This is the longest review that I would like to see in the world.  This one is much longer than before because I added some text to make it longer.',
    },
];

export const defaultCloseArray: Partial<CloseDocument>[] = [
    {
        closeText: 'This is a close.',
    },
    {
        closeText: 'This is the longest close that I would like to see in the world.',
    },
];

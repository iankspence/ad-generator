import { CreateReviewSourceTextHash } from '@monorepo/type';
import crypto from 'crypto';

export const createReviewSourceTextHash = (createReviewSourceTextHash: CreateReviewSourceTextHash) => {
    const combinedText = `${createReviewSourceTextHash.source} ${createReviewSourceTextHash.reviewText}`;
    const hash = crypto.createHash('md5');
    hash.update(combinedText);
    return hash.digest('hex');
}

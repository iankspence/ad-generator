import { ReviewDocument } from '../../schema/review';
import { HookDocument } from '../../schema/hook';

export interface GenerateClaimCopyCloseJob {
    review: Partial<ReviewDocument>;
    hook: Partial<HookDocument>
}

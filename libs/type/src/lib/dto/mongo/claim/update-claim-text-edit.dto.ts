import { ClaimDocument } from '../../../schema/claim';

export interface UpdateClaimTextEditDto {
    claim: Partial<ClaimDocument>;
}

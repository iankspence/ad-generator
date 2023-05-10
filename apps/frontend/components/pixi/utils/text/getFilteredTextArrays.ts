export const getFilteredTextArrays = (
    reviews,
    reviewPosition,
    hooks,
    hookPosition,
    claims,
    closes,
    selectedAudiencePosition
) => {

    const filteredReviews = reviews.filter(
        (review) => review.bestFitAudience === selectedAudiencePosition
    );

    const currentReviewId =
        filteredReviews[reviewPosition - 1]?._id?.toString() || null;


    const filteredHooks = hooks.filter(
        (hook) => hook.reviewId === currentReviewId
    );
    const currentHookId =
        filteredHooks[hookPosition - 1]?._id?.toString() || null;
    const filteredClaims = claims.filter(
        (claim) => claim.reviewId === currentReviewId && claim.hookId === currentHookId
    );
    const filteredCloses = closes.filter(
        (close) => close.reviewId === currentReviewId && close.hookId === currentHookId
    );

    return {
        filteredReviews,
        filteredHooks,
        filteredClaims,
        filteredCloses,
    };
};

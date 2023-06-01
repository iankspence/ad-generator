import { audiences } from '../../../utils/constants/audiences';
import { OpenAiService } from '../../open-ai/open-ai.service';
import { ReviewGateway } from '../../websocket/review.gateway';
import { ReviewQueueProducerService } from './review-queue-producer.service';
import {
    ClassifyReviewJob,
    CreateRateMdsReviewJob,
    ExtractHooksFromReviewJob, GenerateClaimCopyCloseJob,
    HookDocument,
    Review,
    ReviewDocument,
} from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { CreateReviewWithHash } from '@monorepo/type';
import { createReviewSourceTextHash } from './utils/create-review-source-text-hash';


@Processor('review-queue')
export class ReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly openAiService: OpenAiService,
        private readonly reviewGateway: ReviewGateway,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
    ) {}

    async createReviewWithHash(createReviewWithHash: CreateReviewWithHash): Promise<ReviewDocument | null> {
        const reviewSourceTextHash = createReviewSourceTextHash({
            source: createReviewWithHash.review.source,
            reviewText: createReviewWithHash.review.reviewText,
        });

        const existingReview = await this.reviewModel.findOne({
            sourceTextHash: reviewSourceTextHash,
        });
        if (existingReview) {
            console.log(`Review already exists, skipping`);
            return null;
        }

        createReviewWithHash.review.sourceTextHash = reviewSourceTextHash;
        return this.reviewModel.create(createReviewWithHash.review);
    }

    @Process('create-rate-mds-review')
    async createRateMdsReview(job: Job<CreateRateMdsReviewJob>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        const reviewDocument = await this.createReviewWithHash({
            review: job.data.review,
        });
        console.log(`Processing job ${job.id} completed successfully`);
        if (!reviewDocument) {
            return;
        } else {
            return this.reviewQueueProducerService.addClassifyReviewJob({
                review: reviewDocument,
            });
        }
    }

    @Process('create-google-review')
    async createGoogleReview(job: Job<CreateRateMdsReviewJob>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        const reviewDocument = await this.createReviewWithHash({
            review: job.data.review,
        });
        console.log(`Processing job ${job.id} completed successfully`);

        if (!reviewDocument) {
            return;
        } else {
            return this.reviewQueueProducerService.addClassifyReviewJob({
                review: reviewDocument,
            });
        }
    }

    @Process('classify-review')
    async classifyReview(job: Job<ClassifyReviewJob>): Promise<void> {
        try {

            console.log(`Processing job ${job.id} with data:`, job.data);
            const result = await this.openAiService.updateReviewWithClassification({
                review: job.data.review,
            });
            console.log(`Processing job ${job.id} completed successfully`);

            this.reviewGateway.server.emit('reviewProcessed', result);

            if (result.bestFitAudience) {
                console.log(`Best fit audience found, now extracting hooks`);
                return this.reviewQueueProducerService.addExtractHooksFromReviewJob({
                    review: result,
                });
            } else {
                console.log(`No best fit audience found, skipping hook extraction`);
                return;
            }
        } catch (error) {
            console.error(`Error processing job ${job.id}:`, error);
        }
    }

    @Process('extract-hooks-from-review')
    async extractHooksFromReview(job: Job<ExtractHooksFromReviewJob>): Promise<void> {
        try {
            const newHooks = await this.openAiService.extractHooksFromReview({
                reviewId: job.data.review._id.toString(),
                reviewText: job.data.review.reviewText,
                accountId: job.data.review.accountId,
                userId: job.data.review.userId,
                }
            );

            newHooks.map((hook: Partial<HookDocument>) => {
                return this.reviewQueueProducerService.addGenerateClaimCopyCloseJob({
                    review: job.data.review,
                    hook,
                });
            });
            console.log(`Processing job ${job.id} completed successfully`);
        } catch (error) {
            console.error(`Error processing job ${job.id}:`, error);
        }
    }

    @Process('generate-claim-copy-close')
    async generateClaimCopyClose(job: Job<GenerateClaimCopyCloseJob>): Promise<void> {
        try {
            const audience = audiences[job.data.review.bestFitAudience - 1];

            await this.openAiService.generateClaimCopyClose({
                accountId: job.data.review.accountId,
                reviewId: job.data.review._id.toString(),
                reviewText: job.data.review.reviewText,
                hookId: job.data.hook._id.toString(),
                hookText: job.data.hook.hookText,
                reviewAudienceName: audience.name,
                reviewAudienceAge: audience.ageRange,
                }

            );
            console.log(`Processing job ${job.id} completed successfully`);
        } catch (error) {
            console.error(`Error processing job ${job.id}:`, error);
        }
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job started: ${job.id}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job) {
        console.log(`Processing job completed: ${job.id}`);
    }
}

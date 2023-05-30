import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IncomingWebhookDataDto } from '../dto/browse-ai/incoming-webhook-data.dto';

export interface RateMdsHeaderCapturedText {
    Name: string | null;
    TypeOfDoctor: string | null;
    NumberOfReviews: string | null;
    CurrentRanking: string | null;
    RankingMax: string | null;
    RankingCategory: string | null;
    RankingCategoryLink: string | null;
    ProfileImage: string | null;
    ClinicName: string | null;
    ClinicLink: string | null;
    WebsiteLink: string | null;
    ProvinceState: string | null;
    City: string | null;
}

export interface RateMdsReviewCapturedList {
    Position: string | null;
    StaffRating: string | null;
    PunctualityRating: string | null;
    HelpfulnessRating: string | null;
    KnowledgeRating: string | null;
    ReviewText: string | null;
    ReviewDate: string | null;
    ResponseDate: string | null;
    ResponseText: string | null;
}

export interface BrowseAiJobDocument extends BrowseAiJob, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class BrowseAiJob {
    @Prop({ required: true })
    userId!: string;

    @Prop({ required: true })
    accountId!: string;

    @Prop({ required: true })
    statusCode!: number;

    @Prop({ required: true })
    statusMessage!: string;

    @Prop({
        required: true,
        type: {
            id: String,
            status: String,
            createdAt: Number,
            finishedAt: Number,
            retriedOriginalTaskId: String,
            retriedByTaskId: String,
            startedAt: Number,
            robotId: String,
            triedRecordingVideo: Boolean,
            robotBulkRunId: String,
            runByAPI: Boolean,
            runByTaskMonitorId: String,
            runByUserId: String,
            userFriendlyError: String,
            inputParameters: Object,
            videoRemovedAt: Number,
            capturedDataTemporaryUrl: String,
            capturedTexts: Object,
            capturedScreenshots: Object,
            capturedLists: Object,
        },
    })
    result!: {
        id: string;
        status: string;
        createdAt: number;
        finishedAt: null | number;
        retriedOriginalTaskId: null | string;
        retriedByTaskId: null | string;
        startedAt: number;
        robotId: string;
        triedRecordingVideo: boolean;
        robotBulkRunId: null | string;
        runByAPI: boolean;
        runByTaskMonitorId: null | string;
        runByUserId: null | string;
        userFriendlyError: null | string;
        inputParameters: { originUrl: string } | { originUrl: string; dr_fix_review_list_ratemds_limit: number };
        videoRemovedAt: null | number;
        capturedDataTemporaryUrl: string | null;
        capturedTexts: object;
        capturedScreenshots: object;
        capturedLists: object;
    };

    @Prop({
        required: false,
        type: {
            id: String,
            inputParameters: Object,
            robotId: String,
            status: String,
            runByUserId: String,
            robotBulkRunId: String,
            runByTaskMonitorId: String,
            runByAPI: Boolean,
            createdAt: Number,
            startedAt: Number,
            finishedAt: Number,
            userFriendlyError: String,
            triedRecordingVideo: Boolean,
            videoUrl: String,
            videoRemovedAt: Number,
            retriedOriginalTaskId: String,
            retriedByTaskId: String,
            capturedDataTemporaryUrl: String,
            capturedTexts: Object,
            capturedScreenshots:  Object,
            capturedLists: Object,
        }
    })
    taskFromWebhook!: IncomingWebhookDataDto['task'];

    @Prop({
        required: false,
        type: {
            event: String,
        }
    })
    eventFromWebhook!: IncomingWebhookDataDto['event'];
}

export const BrowseAiJobSchema = SchemaFactory.createForClass(BrowseAiJob);

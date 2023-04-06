import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
    clinicId!: string;

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
            retriedTaskId: String,
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
            capturedDataTemporaryUrl: Object,
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
        retriedTaskId: null | string;
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
        capturedDataTemporaryUrl: object;
        capturedTexts: object;
        capturedScreenshots: object;
        capturedLists: object;
    };

    @Prop({
        required: false,
        type: {
            id: String,
            status: String,
            createdAt: Number,
            finishedAt: Number,
            retriedOriginalTaskId: String,
            retriedTaskId: String,
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
            videoUrl: String,
            capturedDataTemporaryUrl: Object,
            capturedTexts: Object,
            capturedScreenshots: Object,
            capturedLists: Object,
        },
    }) // set with webhook after task completes
    taskFromWebhook!: {
        id: string;
        status: string;
        createdAt: number;
        finishedAt: null | number;
        retriedOriginalTaskId: null | string;
        retriedTaskId: null | string;
        retriedByTaskId: null | string;
        startedAt: number;
        robotId: string;
        triedRecordingVideo: boolean;
        robotBulkRunId: null | string;
        runByAPI: boolean;
        runByTaskMonitorId: null | string;
        runByUserId: null | string;
        userFriendlyError: null | string;
        inputParameters: object;
        videoRemovedAt: null | number;
        videoUrl: null | string;
        capturedDataTemporaryUrl: object;
        capturedTexts: RateMdsHeaderCapturedText;
        capturedScreenshots: object;
        capturedLists: RateMdsReviewCapturedList;
    };

    @Prop({ required: false }) // set with webhook after task completes
    eventFromWebhook!: string;
}

export const BrowseAiJobSchema = SchemaFactory.createForClass(BrowseAiJob);

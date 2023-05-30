export class IncomingWebhookDataDto {
    event!: "task.finishedSuccessfully" | "task.finishedWithError" | "task.capturedDataChanged";
    task!: {
        id: string;
        inputParameters: object;
        robotId: string;
        status: "successful" | "failed";
        runByUserId: string | null;
        robotBulkRunId: string | null;
        runByTaskMonitorId: string | null;
        runByAPI: boolean;
        createdAt: number;
        startedAt: number;
        finishedAt: number;
        userFriendlyError: string | null;
        triedRecordingVideo: boolean;
        videoUrl: string | null;
        videoRemovedAt: number | null;
        retriedOriginalTaskId: string | null;
        retriedByTaskId: string | null;
        capturedDataTemporaryUrl: string | null;
        capturedTexts: any | null;
        capturedScreenshots: any | null;
        capturedLists: any | null;
    }
}

import { StartRobotJobDto } from './start-robot-job.dto'

export class ExternalBrowseAiJobDto {
    url!: StartRobotJobDto['robotUrl'];
    data!: {
        inputParameters: StartRobotJobDto['inputParameters'];
    };
    config!: {
        headers: {
            Authorization: string;
            'Content-Type': string;
        }
    }
}

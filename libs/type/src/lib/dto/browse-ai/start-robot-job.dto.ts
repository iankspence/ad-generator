export class StartRobotJobDto {
    userId!: string;
    accountId!: string;
    robotUrl!: string;
    inputParameters!: {
        originUrl: string
        dr_fix_review_list_ratemds_limit?: number
    };
}

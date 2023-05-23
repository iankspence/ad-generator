import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateAdSetForPdfDeliveryDto {
    @IsString()
    readonly userId!: string;

    @IsString()
    readonly accountId!: string;

    @IsArray()
    readonly adIds!: string[];

    @IsInt()
    readonly bestFitAudience!: number;

    @IsString()
    readonly bestFitAudienceName!: string;

    @IsArray()
    readonly ageRange!: [number, number];

    @IsArray()
    readonly interests!: string[];
}

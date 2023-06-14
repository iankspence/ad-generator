import { IsNotEmpty, IsString } from 'class-validator';

export class UploadBackgroundImageDto {
    @IsNotEmpty()
    @IsString()
    accountId!: string;
}

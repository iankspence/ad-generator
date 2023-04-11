import { S3Service } from './s3.service';
import { Controller, Post, Body, Get, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    /**
     *
     * @param path - The path of the folder to create.
     */
    @Post('create-folder')
    async createFolder(@Body('path') path: string): Promise<void> {
        await this.s3Service.createFolder(path);
    }

    /**
     *
     * @returns An array of strings, each of which is the path to a account.
     */
    @Get('list-clinics')
    async listClinics(): Promise<string[]> {
        return await this.s3Service.listClinics();
    }

    /**
     *
     * @param clinicPath - The path of the account.
     * @returns An array of strings, each of which is the path to an ad set for the account.
     */
    @Get('list-account-ad-sets/:clinicPath')
    async listClinicAdSets(@Param('clinicPath') clinicPath: string): Promise<string[]> {
        return await this.s3Service.listClinicAdSets(decodeURIComponent(clinicPath));
    }

    /**
     *
     * @param clinicPath - The path to check for the account. The path should be in the format 'Country/Province/City/Clinic'.
     * @returns Returns true if the account exists and false otherwise.
     */
    @Post('check-account-exists')
    async checkClinicExists(@Body('clinicPath') clinicPath: string): Promise<boolean> {
        return await this.s3Service.checkClinicExists(clinicPath);
    }

    /**
     * Retrieves base colours for a account from s3 paths.
     */
    @Post('retrieve-base-colours')
    async retrieveBaseColours(@Body('adSetPath') adSetPath: string): Promise<string[]> {
        return await this.s3Service.retrieveBaseColours(decodeURIComponent(adSetPath));
    }

    @Post('save-images')
    async saveImages(
        @Body()
        data: {
            s3Folder: string;
            s3FileSuffix: string;
            images: {
                positiveDescriptorData: string;
                claimData: string;
                reviewData: string;
                brandData: string;
            };
        },
    ): Promise<void> {
        await this.s3Service.saveImages(data);
    }
}

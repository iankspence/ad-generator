import { Injectable } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';

import { join } from 'path';

const s3 = new S3Client({
    region: 'us-east-2',
});

@Injectable()
export class S3Service {
    /**
     *
     * @param path - The path of the folder to create.
     */
    async createFolder(path: string): Promise<void> {
        console.log('creating folder with path: ', path);
        const params = {
            Bucket: 'chirocreative',
            Key: path + '/',
            Body: '',
        };
        await s3.send(new PutObjectCommand(params));
    }

    /**
     *
     * @returns An array of strings, each of which is the path to a clinic.
     */
    async listClinics(): Promise<string[]> {
        const folders = await this.listFolders(''); // starting with anything

        return await this.filterFolderList(folders, 4); // clinics have 4 slashes
    }

    /**
     *
     * @param clinicPath - The path of the clinic.
     * @returns An array of strings, each of which is the path to an ad set for the clinic.
     */
    async listClinicAdSets(clinicPath: string): Promise<string[]> {
        const folders = await this.listFolders(clinicPath);

        return folders.filter((path) => {
            const numSlashes = path.split('/').length - 1;
            const hasAdSets = path.includes('Ad_Sets');
            return numSlashes === 6 && hasAdSets;
        });
    }

    /**
     *
     * @param path - The path containing of all the folders to be listed (if empty, lists all).
     * @returns A list of all folders and subfolders within the specified path.
     */
    async listFolders(path: string): Promise<string[]> {
        const params = {
            Bucket: 'chirocreative',
            Delimiter: '/',
            Prefix: path,
        };

        const response = await s3.send(new ListObjectsV2Command(params));
        let folders = [];
        if (response.CommonPrefixes) {
            folders = response.CommonPrefixes.map((folder) => folder.Prefix);

            // Recursively call listFolders for each subdirectory
            for (const subdirectory of response.CommonPrefixes) {
                const subfolders = await this.listFolders(subdirectory.Prefix);
                folders = folders.concat(subfolders);
            }
        }

        return folders;
    }

    /**
     *
     * @param folders - An array of folders to filter by depth.
     * @param pathSlashes - The number of forward slashes to include (folder depth).
     * @returns An array of filtered folders.
     */
    async filterFolderList(
        folders: string[],
        pathSlashes: number
    ): Promise<string[]> {
        return folders.filter((path) => {
            const numSlashes = path.split('/').length - 1;
            return numSlashes === pathSlashes;
        });
    }

    /**
     * Checks if a clinic exists in the specified path in S3.
     * @param clinicPath - The path to check for the clinic. The path should be in the format 'Country/Province/City/Clinic'.
     * @returns Returns true if the clinic exists and false otherwise.
     * @throws Throws an error if the clinic existence check fails.
     */
    async checkClinicExists(clinicPath: string): Promise<boolean> {
        try {
            const folders = await this.listFolders(clinicPath);
            return folders.length > 0 && folders[0] === `${clinicPath}/`;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed to check if clinic ${clinicPath} exists`);
        }
    }


    async retrieveBaseColours(adSetPath: string): Promise<string[]> {
        const facilityPath = join(adSetPath, '..', '..'); // Get the facility path by going up two levels
        const baseImagePath = join(facilityPath, 'Base_Images'); // Create the base image path by appending 'Base_Images' to the facility path

        const params = {
            Bucket: 'chirocreative',
            Prefix: baseImagePath,
        };

        const response = await s3.send(new ListObjectsV2Command(params));
        let baseColours = [];
        if (response.Contents) {
            baseColours = response.Contents.filter((content) =>
                content.Key.endsWith('.png')
            )
                .map((content) => content.Key)
                .map((fileName) => fileName.split('__')[1].replace('.png', ''));
        }
        return baseColours;
    }


    async saveImages(
        data: {
            s3Folder: string,
            s3FileSuffix: string,
            images: {
                positiveDescriptorData: string;
                claimData: string;
                reviewData: string;
                brandData: string;
            }
        }): Promise<void> {
        // Define the keys (paths) for each image in your S3 bucket
        const imageKeys = [
            'positive_descriptor____',
            'claim____',
            'review____',
            'brand____',
        ];
        // Iterate over each image data and key pair and save them to S3
        for (const [index, imageData] of Object.values(data.images).entries()) {
            const imageBuffer = Buffer.from(imageData, 'base64');
            const key = imageKeys[index];

            await s3.send(
                new PutObjectCommand({
                    Bucket: 'chirocreative',
                    Key: data.s3Folder + key + data.s3FileSuffix + '.png',
                    Body: imageBuffer,
                    ContentType: 'image/png',
                })
            );
        }
    }

}

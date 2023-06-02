import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import * as async from 'async';
import { CountryService } from '../mongo/country/country.service';
import { ProvinceStateService } from '../mongo/province-state/province-state.service';
import { CityService } from '../mongo/city/city.service';
import { City, Country, ProvinceState } from '@monorepo/type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('csv')
export class CsvController {
    constructor(
        private readonly countryService: CountryService,
        private readonly provinceStateService: ProvinceStateService,
        private readonly cityService: CityService,
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('country-province-state-city')
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    async uploadFile(@UploadedFile() file) {
        const countries = new Map<string, Country>();
        const provinceStates = new Map<string, ProvinceState>();

        // Create a queue to handle cities batch processing
        const cityQueue = async.cargo(async (cities: City[], callback) => {
            try {
                await this.cityService.bulkCreate(cities);
                callback();
            } catch (err) {
                console.error('Error during city data saving:', err);
                callback(err);
            }
        }, 500);

        await new Promise<void>((resolve, reject) => {
            createReadStream(file.path)
                .pipe(csvParser({ separator: ',' }))
                .on('data', ({ name, provinceState, country, latitude, longitude }) => {

                    if (!countries.has(country)) {
                        countries.set(country, { name: country });
                    }

                    if (!provinceStates.has(provinceState)) {
                        provinceStates.set(provinceState, { name: provinceState, countryName: country });
                    }

                    const city = {
                        name,
                        provinceState,
                        country,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                    };

                    cityQueue.push(city, err => {
                        if (err) {
                            console.error('Error during city processing:', err);
                            reject(err);
                        }
                    });
                })
                .on('end', () => {
                    cityQueue.drain(() => {
                        resolve();
                    });
                })
                .on('error', reject);
        });

        await this.saveData(countries, provinceStates);

        return { status: 'ok' };
    }

    private async saveData(countries: Map<string, Country>, provinceStates: Map<string, ProvinceState>) {
        try {
            await this.countryService.bulkCreate(Array.from(countries.values()));
            await this.provinceStateService.bulkCreate(Array.from(provinceStates.values()));
        } catch (err) {
            console.error('Error during data saving:', err);
        }
    }
}


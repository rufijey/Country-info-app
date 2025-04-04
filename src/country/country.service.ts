import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CountryClient } from './country.client';
import { CountryInfoDto } from './dto/country-info.dto';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
    constructor(private countryClient: CountryClient) {}

    async getAvailableCountries(): Promise<CountryDto[]> {
        return await this.countryClient.fetchAvailableCountries();
    }

    async getCountryInfo(countryCode: string): Promise<CountryInfoDto> {
        try {
            const [bordersData, populationData, flagData] = await Promise.all([
                this.countryClient.fetchCountryBorders(countryCode),
                this.countryClient.fetchPopulationData(countryCode),
                this.countryClient.fetchFlagData(countryCode),
            ]);

            return new CountryInfoDto(
                bordersData.borders,
                populationData.data.populationCounts,
                flagData.data.flag
            );
        } catch (error) {
            throw error;
        }
    }
}

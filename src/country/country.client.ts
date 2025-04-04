import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import iso from 'iso-3166-1';

import { ApiResponseDto } from './dto/api-response.dto';
import { CountryDto } from './dto/country.dto';
import { PopulationDataDto } from './dto/population-data.dto';
import { FlagDataDto } from './dto/flag-data.dto';
import { BordersDataDto } from './dto/borders-data.dto';

@Injectable()
export class CountryClient {
    private readonly countryListUrl: string;
    private readonly countryInfoUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {
        const countryListUrl =
            this.configService.get<string>('COUNTRY_LIST_URL');
        const countryInfoUrl =
            this.configService.get<string>('COUNTRY_INFO_URL');

        if (!countryListUrl || !countryInfoUrl) {
            throw new HttpException(
                'Problems with environment',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        this.countryListUrl = countryListUrl;
        this.countryInfoUrl = countryInfoUrl;
    }

    async fetchAvailableCountries(): Promise<CountryDto[]> {
        try {
            const response = await lastValueFrom(
                this.httpService.get<CountryDto[]>(
                    `${this.countryListUrl}/AvailableCountries`
                )
            );

            return plainToInstance(CountryDto, response.data, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new HttpException(
                'Error fetching countries',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async fetchCountryBorders(countryCode: string): Promise<BordersDataDto> {
        try {
            const response = await lastValueFrom(
                this.httpService.get<BordersDataDto>(
                    `${this.countryListUrl}/CountryInfo/${countryCode}`
                )
            );
            return plainToInstance(BordersDataDto, response.data, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new HttpException(
                'Error fetching country borders',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async fetchPopulationData(
        countryCode: string
    ): Promise<ApiResponseDto<PopulationDataDto>> {
        const iso3 = iso.whereAlpha2(countryCode)?.alpha3;
        if (!iso3) {
            throw new HttpException(
                'Invalid country code',
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const response = await lastValueFrom(
                this.httpService.post<ApiResponseDto<PopulationDataDto>>(
                    `${this.countryInfoUrl}/countries/population`,
                    {
                        iso3: iso3,
                    }
                )
            );
            return plainToInstance(
                ApiResponseDto<PopulationDataDto>,
                response.data,
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            throw new HttpException(
                'Error fetching population data',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async fetchFlagData(
        countryCode: string
    ): Promise<ApiResponseDto<FlagDataDto>> {
        try {
            const response = await lastValueFrom(
                this.httpService.post<ApiResponseDto<FlagDataDto>>(
                    `${this.countryInfoUrl}/countries/flag/images`,
                    {
                        iso2: countryCode,
                    }
                )
            );
            return plainToInstance(ApiResponseDto<FlagDataDto>, response.data, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new HttpException(
                'Error fetching flag data',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}

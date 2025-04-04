import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { HolidayDto } from './dto/holiday.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CalendarClient {
    private readonly countryListUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {
        const countryListUrl =
            this.configService.get<string>('COUNTRY_LIST_URL');

        if (!countryListUrl) {
            throw new HttpException(
                'Problems with environment',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        this.countryListUrl = countryListUrl;
    }

    async fetchPublicHolidays(
        year: number,
        countryCode: string
    ): Promise<HolidayDto[]> {
        try {
            const response = await lastValueFrom(
                this.httpService.get<HolidayDto[]>(
                    `${this.countryListUrl}/PublicHolidays/${year}/${countryCode}`
                )
            );
            return plainToInstance(HolidayDto, response.data, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            throw new HttpException(
                'Error fetching holidays',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}

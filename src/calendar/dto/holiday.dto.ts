import { Expose } from 'class-transformer';

export class HolidayDto {
    @Expose()
    date: string;
    @Expose()
    localName: string;
    @Expose()
    name: string;
    @Expose()
    countryCode: string;
}

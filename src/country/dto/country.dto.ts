import { Expose } from 'class-transformer';

export class CountryDto {
    @Expose()
    countryCode: string;
    @Expose()
    name: string;
}

import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryInfoDto } from './dto/country-info.dto';

@Controller('countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get()
    async getAvailableCountries() {
        return this.countryService.getAvailableCountries();
    }

    @Get(':countryCode')
    async getCountryInfo(
        @Param('countryCode') countryCode: string
    ): Promise<CountryInfoDto> {
        return this.countryService.getCountryInfo(countryCode);
    }
}

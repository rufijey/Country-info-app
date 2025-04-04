import { FlagDataDto } from './flag-data.dto';
import { PopulationDataDto } from './population-data.dto';
import { BordersDataDto } from './borders-data.dto';
import { BordersDto } from './borders.dto';
import { PopulationCountDto } from './population-count.dto';

export class CountryInfoDto {
    borders: BordersDto[];

    population: PopulationCountDto[];

    flag: string;

    constructor(
        borders: BordersDto[],
        population: PopulationCountDto[],
        flag: string
    ) {
        this.borders = borders;
        this.population = population;
        this.flag = flag;
    }
}

import { PopulationCountDto } from './population-count.dto';
import { ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class PopulationDataDto {
    @Expose()
    iso3: string;
    @Expose()
    country: string;
    @ValidateNested({ each: true })
    @Type(() => PopulationCountDto)
    populationCounts: PopulationCountDto[];
}

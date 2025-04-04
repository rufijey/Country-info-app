import { Expose } from 'class-transformer';

export class PopulationCountDto {
    @Expose()
    year: string;
    @Expose()
    value: number;
}

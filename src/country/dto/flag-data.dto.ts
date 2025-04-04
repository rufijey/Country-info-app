import { Expose } from 'class-transformer';

export class FlagDataDto {
    @Expose()
    iso2: string;
    @Expose()
    flag: string;
}

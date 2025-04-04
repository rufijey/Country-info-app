import { Expose } from 'class-transformer';

export class BordersDto {
    @Expose()
    commonName: string;
    @Expose()
    officialName: string;
    @Expose()
    region: string;
}

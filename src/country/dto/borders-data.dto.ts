import { BordersDto } from './borders.dto';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class BordersDataDto {
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => BordersDto)
    borders: BordersDto[];
}

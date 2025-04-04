import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { T } from './t.dto';

export class ApiResponseDto<T> {
    @Expose()
        error?: boolean;
    @Expose()
        msg?: string;
    @Expose()
        data: T;
}

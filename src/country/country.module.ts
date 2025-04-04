import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryClient } from './country.client';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [CountryService, CountryClient],
    controllers: [CountryController],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        HttpModule,
    ],
})
export class CountryModule {}

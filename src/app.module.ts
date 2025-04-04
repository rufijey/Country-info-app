import { Module } from '@nestjs/common';
import * as process from 'node:process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './country/country.module';
import { CalendarModule } from './calendar/calendar.module';
import { Event } from './calendar/event.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Event],
            synchronize: true,
        }),
        CountryModule,
        CalendarModule,
    ],
})
export class AppModule {}

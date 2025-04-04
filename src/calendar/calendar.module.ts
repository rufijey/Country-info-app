import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { HttpModule } from '@nestjs/axios';
import { CalendarClient } from './calendar.client';
import { ConfigModule } from '@nestjs/config';

@Module({
    providers: [CalendarService, CalendarClient],
    controllers: [CalendarController],
    imports: [
        TypeOrmModule.forFeature([Event]),
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
    ],
})
export class CalendarModule {}

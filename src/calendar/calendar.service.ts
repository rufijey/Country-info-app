import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Event } from './event.entity';
import { CalendarClient } from './calendar.client';
import { AddHolidaysDto } from './dto/add-holidays.dto';

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        private httpService: HttpService,
        private calendarClient: CalendarClient
    ) {}

    async addHolidays(userId: string, addHolidaysDto: AddHolidaysDto) {
        const holidaysData = await this.calendarClient.fetchPublicHolidays(
            addHolidaysDto.year,
            addHolidaysDto.countryCode
        );

        if (addHolidaysDto.holidays) {
            const filteredHolidays = holidaysData.filter((h) =>
                addHolidaysDto.holidays.includes(h.localName)
            );
            filteredHolidays.forEach((h) => {
                const event = this.eventRepository.create({
                    userId,
                    countryCode: addHolidaysDto.countryCode,
                    year: addHolidaysDto.year,
                    name: h.localName,
                });
                this.eventRepository.save(event);
            });
        }
    }
}

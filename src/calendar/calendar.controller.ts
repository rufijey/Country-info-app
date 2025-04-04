import { Controller, Post, Body, Param } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';

@Controller('users/:userId/calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Post('holidays')
    async addHolidays(
        @Param('userId') userId: string,
        @Body() addHolidaysDto: AddHolidaysDto
    ): Promise<void> {
        return this.calendarService.addHolidays(userId, addHolidaysDto);
    }
}

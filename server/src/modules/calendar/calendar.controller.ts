import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CalendarService } from '@modules/calendar/calendar.service';
import { Calendar, User } from '@prisma/client';
import { CreateCalendarRequestDto } from '@modules/calendar/dto';
import { AuthUser } from '@shared/decorators';
import { JwtAuthGuard } from '@shared/guards';

@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@AuthUser() user: User): Promise<Calendar[]> {
    return await this.calendarService.getAll(user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) calendarId: string, @AuthUser() user: User): Promise<Calendar> {
    return await this.calendarService.delete(calendarId, user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCalendarRequestDto: CreateCalendarRequestDto, @AuthUser() user: User): Promise<Calendar> {
    return await this.calendarService.create(user.id, createCalendarRequestDto);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CalendarEventService } from '@modules/calendar-event/calendar-event.service';
import { CreateCalendarEventRequestDto, UpdateCalendarEventRequestDto } from '@modules/calendar-event/dto';
import { CalendarEvent } from '@prisma/client';
import { JwtAuthGuard } from '@shared/guards';

@Controller('calendar-events')
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Patch(':calendarId/:eventId')
  @UseGuards(JwtAuthGuard)
  async patchById(
    @Param('calendarId', ParseUUIDPipe) calendarId: string,
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Body() updateCalendarEventRequestDto: UpdateCalendarEventRequestDto,
  ): Promise<CalendarEvent> {
    try {
      return await this.calendarEventService.updateById(calendarId, eventId, updateCalendarEventRequestDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseUUIDPipe) calendarId: string): Promise<CalendarEvent[]> {
    try {
      return await this.calendarEventService.getAllByCalendarId(calendarId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @Param('id', ParseUUIDPipe) calendarId: string,
    @Body() createCalendarEventDto: CreateCalendarEventRequestDto,
  ): Promise<CalendarEvent> {
    try {
      return await this.calendarEventService.create({ ...createCalendarEventDto, calendarId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

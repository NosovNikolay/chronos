import {
  Body,
  Controller,
  Delete,
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
@Controller()
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Patch('calendar/:calendarId/event/:eventId')
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

  @Get('calendar/:calendarId/event')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('calendarId', ParseUUIDPipe) calendarId: string): Promise<CalendarEvent[]> {
    try {
      return await this.calendarEventService.getAllByCalendarId(calendarId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('calendar/:calendarId/event')
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @Param('calendarId', ParseUUIDPipe) calendarId: string,
    @Body() createCalendarEventDto: CreateCalendarEventRequestDto,
  ): Promise<CalendarEvent> {
    try {
      return await this.calendarEventService.create({ ...createCalendarEventDto, calendarId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('calendar/:calendarId/event/:eventId')
  @UseGuards(JwtAuthGuard)
  async deleteEvent(
    @Param('calendarId', ParseUUIDPipe) calendarId: string,
    @Param('eventId', ParseUUIDPipe) eventId: string,
  ): Promise<CalendarEvent> {
    return await this.calendarEventService.delete(calendarId, eventId);
  }
}

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CalendarService } from '@modules/calendar/calendar.service';
import { Calendar, CalendarRole, User } from '@prisma/client';
import { CreateCalendarRequestDto, CreateInviteTokenRequestDto, UseInviteTokenRequestDto } from '@modules/calendar/dto';
import { AuthUser } from '@shared/decorators';
import { JwtAuthGuard } from '@shared/guards';
import ListCalendsarsResponseClass from '@shared/response-classes/list.responce.dto';

@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}
  // pagination
  // items :{}
  // nextPageToken: ""
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@AuthUser() user: User): Promise<ListCalendsarsResponseClass> {
    const calendars = await this.calendarService.getAll(user.id);
    return {
      items: calendars,
    };
  }

  @Post(':calendarId')
  @UseGuards(JwtAuthGuard)
  async createInviteToken(
    @Param('calendarId', ParseUUIDPipe) calendarId: string,
    @AuthUser() user: User,
    @Body() createInviteTokenRequestDto: CreateInviteTokenRequestDto,
  ): Promise<string> {
    return await this.calendarService.createInviteToken(user.id, calendarId, createInviteTokenRequestDto.role);
  }

  @Post('invite-token/use')
  @UseGuards(JwtAuthGuard)
  async useInviteToken(
    @AuthUser() user: User,
    @Body() useInviteTokenRequestDto: UseInviteTokenRequestDto,
  ): Promise<CalendarRole> {
    return await this.calendarService.useInviteToken(user.id, useInviteTokenRequestDto.inviteToken);
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

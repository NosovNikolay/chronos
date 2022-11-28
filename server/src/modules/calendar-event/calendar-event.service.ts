import { Injectable } from '@nestjs/common';
import { CalendarEventRepository } from '@shared/repositories';
import { CalendarEvent, Prisma } from '@prisma/client';

@Injectable()
export class CalendarEventService {
  constructor(private readonly calendarEventRepository: CalendarEventRepository) {}

  async create(data: Prisma.CalendarEventUncheckedCreateInput): Promise<CalendarEvent> {
    return this.calendarEventRepository.create(data);
  }

  async getAllByCalendarId(calendarId: string): Promise<CalendarEvent[]> {
    return this.calendarEventRepository.getAllByCalendarId(calendarId);
  }

  async updateById(calendarId: string, eventId: string, data: Prisma.CalendarEventUpdateInput): Promise<CalendarEvent> {
    return this.calendarEventRepository.updateById(calendarId, eventId, data);
  }
}

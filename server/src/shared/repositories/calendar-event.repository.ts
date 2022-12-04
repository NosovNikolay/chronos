import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { Prisma, CalendarEvent } from '@prisma/client';

@Injectable()
export class CalendarEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CalendarEventUncheckedCreateInput): Promise<CalendarEvent> {
    return this.prisma.calendarEvent.create({ data });
  }

  async getAllByCalendarId(calendarId: string): Promise<CalendarEvent[]> {
    return this.prisma.calendarEvent.findMany({ where: { calendarId } });
  }
  async delete(calendarId: string, eventId: string): Promise<CalendarEvent> {
    return this.prisma.calendarEvent.delete({
      where: { calendarId_id: { calendarId, id: eventId } },
    });
  }

  async updateById(calendarId: string, eventId: string, data: Prisma.CalendarEventUpdateInput): Promise<CalendarEvent> {
    return this.prisma.calendarEvent.update({
      where: { calendarId_id: { calendarId, id: eventId } },
      data,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { Calendar, Prisma } from '@prisma/client';

@Injectable()
export class CalendarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: Prisma.CalendarCreateInput): Promise<Calendar> {
    return this.prisma.calendar.create({
      data: {
        ...data,
        users: {
          connect: [{ id: userId }],
        },
      },
    });
  }

  async getAll(userId: string): Promise<Calendar[]> {
    return this.prisma.calendar.findMany({ where: { users: { some: { id: userId } } } });
  }

  async getById(calendarId: string, userId: string): Promise<Calendar> {
    return this.prisma.calendar.findFirst({ where: { id: calendarId, users: { some: { id: userId } } } });
  }

  async delete(calendarId: string): Promise<Calendar> {
    return this.prisma.calendar.delete({ where: { id: calendarId } });
  }
}

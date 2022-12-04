import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { Prisma, CalendarRole } from '@prisma/client';

@Injectable()
export class CalendarRolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByCalendarAndUserId(calendarId: string, userId: string): Promise<CalendarRole> {
    return this.prisma.calendarRole.findFirst({ where: { calendarId, userId } });
  }
  async create(data: Prisma.CalendarRoleUncheckedCreateInput): Promise<CalendarRole> {
    return this.prisma.calendarRole.create({ data });
  }
}

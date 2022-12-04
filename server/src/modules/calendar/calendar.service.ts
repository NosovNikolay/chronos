import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalendarRepository } from '@shared/repositories';
import {Calendar, CalendarRole, Prisma, UserRolesEnum} from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CalendarRolesRepository } from '@shared/repositories/calendar-roles.repository';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRolesRepository: CalendarRolesRepository,
    private readonly jwtService: JwtService,
    private readonly calendarRepository: CalendarRepository,
  ) {}

  async createInviteToken(userId: string, calendarId: string, role: UserRolesEnum): Promise<string> {
    const calendarRole = await this.calendarRolesRepository.getByCalendarAndUserId(calendarId, userId);
    if (!calendarRole || calendarRole.role !== UserRolesEnum.ADMIN) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.jwtService.sign({
      role,
      calendarId,
    });
  }

  async useInviteToken(userId: string, token: string): Promise<CalendarRole> {
    const payload = this.jwtService.verify(token);
    const { role, calendarId } = payload;
    const existingRole = await this.calendarRolesRepository.getByCalendarAndUserId(calendarId, userId);
    if (existingRole && existingRole.role === role) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }
    return this.calendarRolesRepository.create({ role, calendarId, userId });
  }

  async create(userId: string, data: Prisma.CalendarUncheckedCreateInput): Promise<Calendar> {
    return this.calendarRepository.create(userId, data);
  }

  async getAll(userId: string): Promise<Calendar[]> {
    return this.calendarRepository.getAll(userId);
  }

  async delete(calendarId: string, userId: string): Promise<Calendar> {
    const calendar = await this.calendarRepository.getById(calendarId, userId);
    if (!calendar) {
      throw new HttpException(`Calendar with id ${calendarId} does not exist`, HttpStatus.NOT_FOUND);
    }
    return this.calendarRepository.delete(calendarId);
  }
}

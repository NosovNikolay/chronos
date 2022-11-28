import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalendarRepository } from '@shared/repositories';
import { Calendar, Prisma } from '@prisma/client';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

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

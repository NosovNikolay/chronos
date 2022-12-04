import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shared/repositories/user.repository';
import { UserRolesEnum, Prisma, User } from '@prisma/client';
import { CalendarRepository } from '@shared/repositories';
import { CalendarRolesRepository } from '@shared/repositories/calendar-roles.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly calendarRolesRepository: CalendarRolesRepository,

    private readonly userRepository: UserRepository,
    private readonly calendarRepository: CalendarRepository,
  ) {}

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.userRepository.create(data);
    const calendar = await this.calendarRepository.create(user.id, { title: `${user.username} root calendar` });
    await this.calendarRolesRepository.create({ userId: user.id, calendarId: calendar.id, role: UserRolesEnum.ADMIN });
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }
}

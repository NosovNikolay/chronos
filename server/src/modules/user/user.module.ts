import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@shared/repositories/user.repository';
import { PrismaService } from '@shared/services';
import { CalendarRolesRepository } from '@shared/repositories/calendar-roles.repository';
import { CalendarRepository } from '@shared/repositories';

@Module({
  providers: [UserService, UserRepository, CalendarRepository, CalendarRolesRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarRepository } from '@shared/repositories';
import { PrismaService } from '@shared/services';
import { CalendarController } from '@modules/calendar/calendar.controller';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '@shared/configs';
import { CalendarRolesRepository } from '@shared/repositories/calendar-roles.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: appConfig.getAppSecret(),
      signOptions: { expiresIn: appConfig.getJwtExpired() },
    }),
  ],
  providers: [CalendarService, CalendarRepository, CalendarRolesRepository, PrismaService],
  controllers: [CalendarController],
  exports: [CalendarService],
})
export class CalendarModule {}

import { Module } from '@nestjs/common';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarRepository } from '@shared/repositories';
import { PrismaService } from '@shared/services';
import { CalendarController } from '@modules/calendar/calendar.controller';

@Module({
  providers: [CalendarService, CalendarRepository, PrismaService],
  controllers: [CalendarController],
  exports: [CalendarService],
})
export class CalendarModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { CalendarEventService } from '@modules/calendar-event/calendar-event.service';
import { CalendarEventRepository } from '@shared/repositories';
import { CalendarEventController } from '@modules/calendar-event/calendar-event.controller';

@Module({
  providers: [CalendarEventService, CalendarEventRepository, PrismaService],
  controllers: [CalendarEventController],
  exports: [CalendarEventService],
})
export class CalendarEventModule {}

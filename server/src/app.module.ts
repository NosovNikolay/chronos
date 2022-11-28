import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaService } from '@shared/services';
import { CalendarEventModule } from '@modules/calendar-event/calendar-event.module';
import { CalendarModule } from '@modules/calendar/calendar.module';

@Module({
  imports: [AuthModule, CalendarEventModule, CalendarModule],
  providers: [PrismaService],
})
export class AppModule {}

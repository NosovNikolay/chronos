import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaService } from '@shared/services';
import { CalendarEventModule } from '@modules/calendar-event/calendar-event.module';

@Module({
  imports: [AuthModule, CalendarEventModule],
  providers: [PrismaService],
})
export class AppModule {}

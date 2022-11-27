import { CalendarEventType } from '@prisma/client';
import { IsBoolean, IsEnum, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateCalendarEventRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsISO8601()
  start: Date;

  @IsISO8601()
  end: Date;

  @IsBoolean()
  isFullDay: boolean;

  @IsEnum(CalendarEventType)
  type: CalendarEventType;
}

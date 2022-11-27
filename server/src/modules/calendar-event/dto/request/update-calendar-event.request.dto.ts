import { IsBoolean, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CalendarEventType } from '@prisma/client';

export class UpdateCalendarEventRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsISO8601()
  @IsOptional()
  start?: Date;

  @IsISO8601()
  @IsOptional()
  end?: Date;

  @IsBoolean()
  @IsOptional()
  isFullDay?: boolean;

  @IsEnum(CalendarEventType)
  @IsOptional()
  type?: CalendarEventType;
}

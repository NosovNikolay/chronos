import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalendarRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

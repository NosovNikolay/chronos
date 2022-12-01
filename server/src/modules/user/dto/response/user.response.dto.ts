import { User, Calendar } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  calendars: Calendar[];

  public static mapFrom(data: User): UserResponseDto {
    return plainToClass(UserResponseDto, data, { excludeExtraneousValues: true });
  }
}

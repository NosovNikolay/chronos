import { User } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  public static mapFrom(data: User): UserResponseDto {
    return plainToClass(UserResponseDto, data, { excludeExtraneousValues: true });
  }
}

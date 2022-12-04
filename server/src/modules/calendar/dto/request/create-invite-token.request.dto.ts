import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRolesEnum } from '@prisma/client';

export class CreateInviteTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;
}

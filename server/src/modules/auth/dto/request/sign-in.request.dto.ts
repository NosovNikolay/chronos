import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;
}

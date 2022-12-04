import { AuthService } from '@modules/auth/auth.service';
import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SignUpRequestDto, SignInRequestDto } from '@modules/auth/dto/request';
import { UserResponseDto } from '@modules/user/dto/response/user.response.dto';
import { JwtAuthGuard } from '@shared/guards';
import { SignInResponseDto } from './dto/responce/sign-in.responce.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async register(@Body() singUpDto: SignUpRequestDto): Promise<UserResponseDto> {
    try {
      const user = await this.authService.registration(singUpDto);
      console.log('user', user);
      return UserResponseDto.mapFrom(user);
    } catch (error) {
      console.log(error);
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }
  }

  @Post('sign-in')
  async login(@Body() signInDto: SignInRequestDto): Promise<SignInResponseDto> {
    const loginResponse = await this.authService.login(signInDto);
    return SignInResponseDto.mapFrom(loginResponse.accessToken);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async protected(): Promise<string> {
    return 'secret data';
  }
}

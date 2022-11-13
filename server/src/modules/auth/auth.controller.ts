import { AuthService } from '@modules/auth/auth.service';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { SignUpRequestDto, SignInRequestDto } from '@modules/auth/dto/request';
import { UserResponseDto } from '@modules/user/dto/response/user.response.dto';
import { JwtAuthGuard } from '@shared/guards';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async register(@Body() singUpDto: SignUpRequestDto): Promise<UserResponseDto> {
    const user = await this.authService.registration(singUpDto);
    return UserResponseDto.mapFrom(user);
  }

  @Post('sign-in')
  async login(
    @Body() signInDto: SignInRequestDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<UserResponseDto> {
    const loginResponse = await this.authService.login(signInDto);
    response.setCookie('Access', loginResponse.accessToken, { httpOnly: false });
    return UserResponseDto.mapFrom(loginResponse.user);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async protected(): Promise<string> {
    return 'secret data';
  }
}

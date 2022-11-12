import {AuthService} from '@modules/auth/auth.service';
import {Controller, Post} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async register(): Promise<any> {
    return this.authService.registration()
  }
}

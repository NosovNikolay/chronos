import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInRequestDto, SignUpRequestDto } from '@modules/auth/dto/request';
import { CryptoService } from '@shared/services/crypto.service';
import { User } from '@prisma/client';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: SignUpRequestDto): Promise<User> {
    dto.password = await this.cryptoService.encryptPassword(dto.password);
    return this.userService.createWithDefaultCalendar(dto);
  }

  async login(dto: SignInRequestDto): Promise<{ user: User; accessToken: string }> {
    const user: User = await this.userService.getByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    if (!(await this.cryptoService.checkPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password or email');
    }
    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { user, accessToken };
  }
}

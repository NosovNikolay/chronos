import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { CryptoService } from '@shared/services/crypto.service';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@shared/strategies/jwt.strategy';
import { appConfig } from '@shared/configs';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: appConfig.getAppSecret(),
      signOptions: { expiresIn: appConfig.getJwtExpired() },
    }),
  ],
  controllers: [AuthController],

  providers: [AuthService, CryptoService, JwtStrategy],
})
export class AuthModule {}

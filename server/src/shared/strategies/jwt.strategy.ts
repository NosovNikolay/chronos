import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { appConfig } from '@shared/configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: appConfig.getAppSecret(),
    });
  }

  private static extractJWT(req: any): string {
    if (req.cookies && 'Access' in req.cookies && req.cookies.Access.length > 0) {
      return req.cookies.Access;
    }
    return null;
  }

  async validate(payload: any): Promise<{ id: string; email: string }> {
    return { id: payload.id, email: payload.email };
  }
}

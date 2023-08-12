import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AppConfigService } from 'src/config/config.services';
import EnvVariables from 'src/config/enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private appConfig: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.get(EnvVariables.JWT_SECRET),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, username: payload.username, email: payload.email }; 
  }
}

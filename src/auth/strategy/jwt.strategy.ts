import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../../config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username,privilege:payload.privilege,phone_number:payload.phone_number,email:payload.email};
  }
}
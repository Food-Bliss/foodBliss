import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Adjust the path accordingly
import { User } from '../Users/entities/users.entity'; // Adjust the path accordingly

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Store your JWT secret in .env
    });
  }

  async validate(payload: any): Promise<User> {
    return this.usersService.findOne(payload.sub); // Assume payload has a 'sub' field with user ID
  }
}

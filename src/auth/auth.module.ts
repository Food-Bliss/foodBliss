import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Store your JWT secret in .env
      signOptions: { expiresIn: '60s' }, // Set token expiration
    }),
  ],
   providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

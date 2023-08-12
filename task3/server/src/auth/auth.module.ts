import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AppConfigService } from 'src/config/config.services';
import EnvVariables from 'src/config/enum';
import { AppConfigModule } from 'src/config/config.module';
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.registerAsync({
      inject: [AppConfigService],
      imports: [AppConfigModule],
      useFactory: (app: AppConfigService) => ({
        global: true,
        secret: app.get(EnvVariables.JWT_SECRET),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

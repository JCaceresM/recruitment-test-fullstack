import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import configuration from './config/env.variables'
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config/config.services';
import { UserEntity } from './users/entities/user.entity';
import { ProductsEntity } from './products/entities/products.entity';
import EnvVariables from './config/enum';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      imports: [AppConfigModule],
      useFactory: (app: AppConfigService) => ({
        type: 'postgres',
        url: app.get('PG_CONNECTION_STRING'),
        entities: [UserEntity, ProductsEntity],
        synchronize: true,
       
      }),
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    AppConfigModule,
  ],
})
export class AppModule {}

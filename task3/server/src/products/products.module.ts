import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsEntity } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

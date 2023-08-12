import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-post.dto';
import { UpdateProductDto } from './dto/update-post.dto';
import { ProductsEntity } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly usersRepository: Repository<ProductsEntity>,
  ) {}
  async findAll(): Promise<ProductsEntity[]> {
    return this.usersRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .select(['product', 'user.id', 'user.name'])
      .getMany();
  }


  async create(product: CreateProductDto): Promise<Record<string, string>> {
    try {
      const newProduct = this.usersRepository.create({...product, user: JSON.parse(product.user as unknown as string)});
      await this.usersRepository.save(newProduct);
      return {
        status: 'ok',
        message: 'Product Created',
      };
    } catch (error) {
        throw new NotFoundException('User could not be created');
      
    }
  }
}

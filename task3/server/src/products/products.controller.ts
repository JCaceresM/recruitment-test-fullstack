import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image, @Body() data: CreateProductDto) {   
    return this.productsService.create({
      ...data,
      image: `data:${image.mimetype};base64,${image.buffer.toString('base64')}`,
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}

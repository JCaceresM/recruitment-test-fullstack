import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-post.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

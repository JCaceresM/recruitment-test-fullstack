import { ProductsEntity } from "src/products/entities/products.entity";

export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  posts: ProductsEntity[];
}

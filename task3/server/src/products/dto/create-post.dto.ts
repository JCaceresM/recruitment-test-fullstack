import { UserEntity } from "src/users/entities/user.entity";

export class CreateProductDto {
  id: number;

  title: string;

  description: string;

  image: string;

  price: number;

  user: UserEntity;
}

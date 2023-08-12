import { ProductsEntity } from 'src/products/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => ProductsEntity, (post) => post.user)
  posts: ProductsEntity[];
  @BeforeInsert()
  async hashPasswordBeforeInsert() {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
  }
}

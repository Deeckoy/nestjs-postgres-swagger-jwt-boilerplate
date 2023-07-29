import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    default: 'no-avatar.png',
  })
  avatar: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  // @OneToMany(() => OrderEntity, (order) => order.user)
  // orders: OrderEntity[];

  // In FileEntity:
  // @ManyToOne(() => UserEntity, user => user.orders)
  // user: UserEntity;
}

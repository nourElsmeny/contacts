import { ObjectId } from 'mongoose';
import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {

  @ObjectIdColumn()
  _id: string;
  
  @PrimaryColumn()
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  image: string;

  @Column()
  country: string;

  @Column()
  mobileNumber: string;

  @Column()
  countryCode: string;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column()
  role: string;

  @Column()
  gender: string;

  @Column()
  pirthDate: string;

  @Column()
  email: string;

  @Column()
  emailVirefy: boolean;

  @Column()
  mobileViryfy: boolean;

  @Column()
  isActive: boolean;

  @Column()
  isDeleted: boolean;

  @Column()
  isLogin: boolean;

  @Column()
  isBlocked: boolean;

  @Column()
  userToken: string;

  @Column()
  oldPassword: string;
  
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

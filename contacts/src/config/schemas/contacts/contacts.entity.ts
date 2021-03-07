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
  Index,
} from 'typeorm';

@Entity()
export class Contacts extends BaseEntity {

  @ObjectIdColumn()
  _id: string;
  
  @PrimaryColumn()
  contactId: string;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  image: string;

  @Column()
  mobileNumber: string;

  @Column()
  email: string;
  
  @Column()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

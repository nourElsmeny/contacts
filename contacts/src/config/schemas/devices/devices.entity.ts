import { ObjectId } from 'mongoose';
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Devices extends BaseEntity {
  @ObjectIdColumn()
  _id: string;
  
  @PrimaryColumn()
  deviceId: string;

  @Column()
  userId: string;

  @Column()
  detail: string;

  @Column()
  isActive: boolean;

  @Column()
  isDeleted: boolean;

  @Column()
  isBlocked: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

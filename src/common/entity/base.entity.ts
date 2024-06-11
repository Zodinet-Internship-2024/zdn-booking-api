/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoMap } from '@automapper/classes';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @AutoMap()
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @AutoMap()
  @Column({
    name: 'created_by',
  })
  createdBy: string;

  @AutoMap()
  @Column({
    name: 'updated_by',
  })
  updatedBy: string;

  @AutoMap()
  @Column({
    name: 'deleted_by',
  })
  deletedBy: string;

  // @AutoMap()
  // @ManyToOne(() => User, (user) => user.createdEntities)
  // @JoinColumn({
  //   name: 'created_by',
  // })
  // createdBy: User;

  // @AutoMap()
  // @ManyToOne(() => User, (user) => user.updatedEntities, { nullable: true })
  // @JoinColumn({
  //   name: 'updated_by',
  // })
  // updatedBy: User;

  // @AutoMap()
  // @ManyToOne(() => User, (user) => user.deletedEntities, { nullable: true })
  // @JoinColumn({
  //   name: 'deleted_by',
  // })
  // deletedBy: User;
}

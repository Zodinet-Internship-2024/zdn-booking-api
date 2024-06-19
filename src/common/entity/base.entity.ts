/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoMap } from '@automapper/classes';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @AutoMap()
  @Column({
    type: 'uuid',
    name: 'created_by',
    nullable: false,
  })
  createdBy: string;

  @AutoMap()
  @Column({
    type: 'uuid',
    name: 'updated_by',
    nullable: true,
  })
  updatedBy: string;

  @AutoMap()
  @Column({
    type: 'uuid',
    name: 'deleted_by',
    nullable: true,
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

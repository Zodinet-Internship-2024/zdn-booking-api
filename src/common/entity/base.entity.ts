import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @AutoMap()
  @Column({
    name: 'created_by',
    nullable: true,
  })
  createdBy: string;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @AutoMap()
  @Column({
    name: 'updated_by',
    nullable: true,
  })
  updatedBy: string;

  @AutoMap()
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @AutoMap()
  @Column({ name: 'deleted_by', type: 'timestamp', nullable: true })
  deletedBy: string;
}

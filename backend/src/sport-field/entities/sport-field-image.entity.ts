import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportField } from './sport-field.entity';
import { CURRENT_TIME_STAMP } from 'src/constants/constants';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class SportFieldImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => SportField, (sportField) => sportField.sportFieldImages)
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportField;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => CURRENT_TIME_STAMP,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createdSportFieldImages)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => CURRENT_TIME_STAMP,
    onUpdate: CURRENT_TIME_STAMP,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.updatedSportFieldImages)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @UpdateDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.deletedSportFieldImages)
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;
}

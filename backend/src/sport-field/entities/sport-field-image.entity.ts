import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SportField } from './sport-field.entity';

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
}

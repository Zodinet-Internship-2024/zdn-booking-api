import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
// import { SportField } from 'src/sport-field/entities/sport-field.entity';
// import { User } from 'src/user/entities/user.entity';
import { Booking } from 'src/booking/entities/booking.entity';
@Entity('field')
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  sport_field_id: string;

  @Column('character varying', { length: 255 })
  name: string;

  @Column('date')
  created_at: Date;

  @Column('uuid')
  created_by: string;

  @Column('date', { nullable: true })
  updated_at: Date;

  @Column('uuid', { nullable: true })
  updated_by: string;

  @Column('date', { nullable: true })
  deleted_at: Date;

  @Column('uuid', { nullable: true })
  deleted_by: string;

  @OneToMany(() => Booking, (booking) => booking.field)
  bookings: Booking[];
}
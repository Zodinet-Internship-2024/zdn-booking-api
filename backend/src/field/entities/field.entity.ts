import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
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

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(7)' })
  created_at: Timestamp;

  @Column('uuid')
  created_by: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(7)' })
  updated_at: Timestamp;

  @Column('uuid', { nullable: true })
  updated_by: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(7)' })
  deleted_at: Timestamp;

  @Column('uuid', { nullable: true })
  deleted_by: string;

  @OneToMany(() => Booking, (booking) => booking.field)
  bookings: Booking[];
}
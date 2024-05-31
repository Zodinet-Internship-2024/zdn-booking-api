import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { Field } from 'src/field/entities/field.entity';
// import { User } from 'src/user/entities/user.entity';

export enum BookingStatus {
  disabled = 'disabled',
  rejected = 'rejected',
  available = 'available',
  accepted = 'accepted',
}

@Entity('booking') // Specify the table name (optional)
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', length: 10 })
  phone: string;

  @Column({ type: 'character varying', length: 52 })
  full_name: string;

  @ManyToOne(() => Field, (field) => field.bookings, { nullable: false })
  @JoinColumn({ name: 'field_id' })
  field: Field;

  @Column('date')
  start_time: Date;

  @Column('date')
  end_time: Date;

  @Column('float')
  amount: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
  })
  status: string;

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
}
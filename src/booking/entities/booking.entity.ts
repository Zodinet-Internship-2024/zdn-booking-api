import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { Field } from 'src/field/entities/field.entity';
import { User } from 'src/user/entities/user.entity';
import { CURRENT_TIMESTAMP } from 'src/constants/constants';
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

  @Column('timestamp')
  created_at: Timestamp;

  @Column('timestamp')
  updated_at: Timestamp;

  @Column('timestamp')
  deleted_at: Timestamp;

  @ManyToOne(() => User, (user) => user.createdBookings, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedBookings, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @ManyToOne(() => User, (user) => user.deletedBookings, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;
}

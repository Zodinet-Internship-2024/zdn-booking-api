/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Field } from 'src/modules/field/entities/field.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum BookingStatus {
  disabled = 'disabled',
  rejected = 'rejected',
  available = 'available',
  accepted = 'accepted',
  booking = 'booking',
}

@Entity('booking') // Specify the table name (optional)
export class Booking extends BaseEntity {
  @AutoMap()
  @Column({ type: 'character varying', length: 10 })
  phone: string;

  @AutoMap()
  @Column({ name: 'full_name', type: 'character varying', length: 52 })
  fullName: string;

  @AutoMap()
  @ManyToOne(() => Field, (field) => field.bookings, { nullable: false })
  @JoinColumn({ name: 'field_id' })
  fieldId: Field;

  @AutoMap()
  @Column({ type: 'date', name: 'start_time' })
  startTime: Date;

  @AutoMap()
  @Column({ type: 'date', name: 'end_time' })
  endTime: Date;

  @AutoMap()
  @Column('float')
  amount: number;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.booking,
  })
  status: string;
}

import { BaseEntity } from 'src/common/entity/base.entity';
import { Field } from 'src/modules/field/entities/field.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum BookingStatus {
  disabled = 'disabled',
  rejected = 'rejected',
  available = 'available',
  accepted = 'accepted',
}

@Entity('booking') // Specify the table name (optional)
export class Booking extends BaseEntity {
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
}

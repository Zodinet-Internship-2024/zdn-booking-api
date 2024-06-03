import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { SportField } from 'src/sport-field/entities/sport-field.entity';
import { User } from 'src/user/entities/user.entity';
import { Booking } from 'src/booking/entities/booking.entity';
@Entity('field')
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SportField, (sportField) => sportField.fields, {
    nullable: false,
  })
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportField;

  @Column('character varying', { length: 255 })
  name: string;

  @Column('timestamp')
  created_at: Timestamp;

  @Column('timestamp')
  updated_at: Timestamp;

  @Column('timestamp')
  deleted_at: Timestamp;

  @ManyToOne(() => User, (user) => user.createdFields, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedFields, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @ManyToOne(() => User, (user) => user.deletedFields, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;

  @OneToMany(() => Booking, (booking) => booking.field)
  bookings: Booking[];
}
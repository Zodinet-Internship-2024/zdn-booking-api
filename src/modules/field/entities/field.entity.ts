import { BaseEntity } from 'src/common/entity/base.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { SportField } from 'src/modules/sport-field/entities/sport-field.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('field')
export class Field extends BaseEntity {
  @ManyToOne(() => SportField, (sportField) => sportField.fields, {
    nullable: false,
  })
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportField;

  @Column('character varying', { length: 255 })
  name: string;

  @OneToMany(() => Booking, (booking) => booking.field)
  bookings: Booking[];
}

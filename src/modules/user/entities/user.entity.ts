import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Account } from 'src/modules/account/entities/account.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Field } from 'src/modules/field/entities/field.entity';
import { SportField } from 'src/modules/sport-field/entities/sport-field.entity';
import { SportFieldImage } from 'src/modules/sport-field/entities/sport-field-image.entity';
import { Location } from 'src/modules/location/entities/location.entity';

enum UserRole {
  user = 'user',
  owner = 'owner',
}

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ type: 'character varying', length: 52, nullable: false })
  name: string;

  @AutoMap()
  @Column({
    type: 'character varying',
    length: 320,
    unique: true,
    nullable: false,
  })
  email: string;

  @AutoMap()
  @Column({
    type: 'character varying',
    length: 10,
    unique: true,
    nullable: false,
  })
  phone: number;

  @AutoMap()
  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @AutoMap()
  @Column({ type: 'text' })
  image_url: string;

  @AutoMap()
  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  password: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Location, (location) => location.createdBy)
  createdLocations: Location[];

  @OneToMany(() => Location, (location) => location.updatedBy)
  updatedLocations: Location[];

  @OneToMany(() => Location, (location) => location.deletedBy)
  deletedLocations: Location[];

  @OneToMany(() => Booking, (booking) => booking.createdBy)
  createdBookings: Booking[];

  @OneToMany(() => Booking, (booking) => booking.updatedBy)
  updatedBookings: Booking[];

  @OneToMany(() => Booking, (booking) => booking.deletedBy)
  deletedBookings: Booking[];

  @OneToMany(() => Field, (field) => field.createdBy)
  createdFields: Field[];

  @OneToMany(() => Field, (field) => field.updatedBy)
  updatedFields: Field[];

  @OneToMany(() => Field, (field) => field.deletedBy)
  deletedFields: Field[];
  @OneToMany(() => SportField, (sportField) => sportField.createdBy)
  createdSportFields: SportField[];

  @OneToMany(() => SportField, (sportField) => sportField.updatedBy)
  updatedSportFields: SportField[];

  @OneToMany(() => SportField, (sportField) => sportField.deletedBy)
  deletedSportFields: SportField[];

  @OneToMany(
    () => SportFieldImage,
    (sportFieldImage) => sportFieldImage.createdBy,
  )
  createdSportFieldImages: SportFieldImage[];

  @OneToMany(
    () => SportFieldImage,
    (sportFieldImage) => sportFieldImage.updatedBy,
  )
  updatedSportFieldImages: SportFieldImage[];

  @OneToMany(
    () => SportFieldImage,
    (sportFieldImage) => sportFieldImage.deletedBy,
  )
  deletedSportFieldImages: SportFieldImage[];

  @OneToMany(() => Account, (account) => account.createdBy)
  createdAccounts: Account[];

  @OneToMany(() => Account, (account) => account.updatedBy)
  updatedAccounts: Account[];

  @OneToMany(() => Account, (account) => account.deletedBy)
  deletedAccounts: Account[];
}
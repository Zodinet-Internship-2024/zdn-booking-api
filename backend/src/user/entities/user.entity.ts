import { Account } from 'src/account/entities/account.entity';
import { SportFieldImage } from 'src/sport-field/entities/sport-field-image.entity';
import { SportField } from 'src/sport-field/entities/sport-field.entity';
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

enum UserRole {
  user = 'user',
  owner = 'owner',
}

import { Location } from 'src/location/entities/location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'character varying', length: 52, nullable: false })
  name: string;

  @Column({
    type: 'character varying',
    length: 320,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'character varying',
    length: 10,
    unique: true,
    nullable: false,
  })
  phone: number;
  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;
  @Column({ type: 'text' })
  image_url: string;

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

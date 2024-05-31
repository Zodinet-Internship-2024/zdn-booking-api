import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportFieldType } from './sport-field-type.entity';
import { SportFieldImage } from './sport-field-image.entity';
import { Location } from 'src/location/entities/location.entity';
import { CURRENT_TIMESTAMP } from 'src/constants/constants';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class SportField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ length: 10, nullable: false })
  phone: string;

  @Column({ type: 'timestamp', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: false })
  endTime: Date;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ length: 65535 })
  rule: string;

  @ManyToOne(
    () => SportFieldType,
    (sportFieldType) => sportFieldType.sportFields,
  )
  @JoinColumn({ name: 'sport_field_type_id' })
  sportFieldType: SportFieldType;

  @OneToMany(
    () => SportFieldImage,
    (sportFieldImage) => sportFieldImage.sportField,
  )
  sportFieldImages: SportFieldImage[];

  @OneToOne(() => Location, (location) => location.sportField)
  location: Location;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createdSportFields)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.updatedSportFields)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.deletedSportFields)
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;
}

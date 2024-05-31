import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';
import { SportField } from 'src/sport-field/entities/sport-field.entity';
import { User } from 'src/user/entities/user.entity';

@Entity(
  {synchronize: true}
)
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SportField, (sportField) => sportField.location)
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportField;

  @ManyToOne(() => Province, (province) => province.locations)
  @JoinColumn({ name: 'provice_id' })
  province: Province;

  @ManyToOne(() => District, (district) => district.locations)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.locations)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @Column({ type: 'character varying', length: 64 })
  address_detail: string;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.createdLocations)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.updatedLocations)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.deletedLocations)
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;
}

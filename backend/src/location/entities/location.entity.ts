import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  sport_field_id: string;

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

  @Column({ type: 'uuid' })
  created_by: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ type: 'uuid', nullable: true })
  deleted_by: string;
}

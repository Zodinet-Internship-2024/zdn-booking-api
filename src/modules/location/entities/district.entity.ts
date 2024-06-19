import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('district')
export class DistrictEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  province_id: string;

  @OneToMany(() => LocationEntity, (location) => location.district)
  locations: LocationEntity[];
}

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('ward')
export class WardEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  district_id: string;

  @OneToMany(() => LocationEntity, (location) => location.ward)
  locations: LocationEntity[];
}

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class District {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  province_id: string;

  @OneToMany(() => Location, (location) => location.district)
  locations: Location[];
}

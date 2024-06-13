import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Ward {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  district_id: string;

  @OneToMany(() => Location, (location) => location.ward)
  locations: Location[];
}

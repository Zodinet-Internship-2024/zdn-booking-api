import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Province {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => Location, (location) => location.province)
  locations: Location[];
}

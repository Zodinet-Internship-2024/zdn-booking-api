import { BaseEntity } from 'src/common/entity/base.entity';
import { SportField } from 'src/modules/sport-field/entities/sport-field.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { District } from './district.entity';
import { Province } from './province.entity';
import { Ward } from './ward.entity';

@Entity({ synchronize: true })
export class Location extends BaseEntity {
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
}

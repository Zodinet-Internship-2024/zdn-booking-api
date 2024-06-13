import { BaseEntity } from 'src/common/entity/base.entity';
import { SportField } from 'src/modules/sport-field/entities/sport-field.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { District } from './district.entity';
import { Province } from './province.entity';
import { Ward } from './ward.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ synchronize: true })
export class Location extends BaseEntity {
  @AutoMap()
  @OneToOne(() => SportField, (sportField) => sportField.location)
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportField;

  @AutoMap()
  @ManyToOne(() => Province, (province) => province.locations)
  @JoinColumn({ name: 'provice_id' })
  province: Province;

  @AutoMap()
  @ManyToOne(() => District, (district) => district.locations)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @AutoMap()
  @ManyToOne(() => Ward, (ward) => ward.locations)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @Column({ name: 'address_detail', type: 'character varying', length: 64 })
  addressDetail: string;

  @AutoMap()
  @Column('float')
  longitude: number;

  @AutoMap()
  @Column('float')
  latitude: number;
}

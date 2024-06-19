import { BaseEntity } from 'src/common/entity/base.entity';
import { SportFieldEntity } from 'src/modules/sport-field/entities/sport-field.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DistrictEntity } from './district.entity';
import { ProvinceEntity } from './province.entity';
import { WardEntity } from './ward.entity';
import { AutoMap } from '@automapper/classes';

@Entity('location')
export class LocationEntity extends BaseEntity {
  @AutoMap()
  @OneToOne(() => SportFieldEntity, (sportField) => sportField.location)
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportFieldEntity;

  @AutoMap()
  @ManyToOne(() => ProvinceEntity, (province) => province.locations)
  @JoinColumn({ name: 'provice_id' })
  province: ProvinceEntity;

  @AutoMap()
  @ManyToOne(() => DistrictEntity, (district) => district.locations)
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity;

  @AutoMap()
  @ManyToOne(() => WardEntity, (ward) => ward.locations)
  @JoinColumn({ name: 'ward_id' })
  ward: WardEntity;

  @Column({ name: 'address_detail', type: 'character varying', length: 64 })
  addressDetail: string;

  @AutoMap()
  @Column('float')
  longitude: number;

  @AutoMap()
  @Column('float')
  latitude: number;
}

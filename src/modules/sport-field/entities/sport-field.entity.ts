import { BaseEntity } from 'src/common/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { FieldEntity } from '../../field/entities/field.entity';
import { LocationEntity } from '../../location/entities/location.entity';
import { SportFieldImageEntity } from './sport-field-image.entity';
import { SportFieldTypeEntity } from './sport-field-type.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity('sport_field')
export class SportFieldEntity extends BaseEntity {
  @AutoMap()
  @Column({ length: 255, nullable: false })
  name: string;

  @AutoMap()
  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @AutoMap()
  @Column({ length: 10 | 11, nullable: false })
  phone: string;

  @AutoMap()
  @Column({ nullable: false })
  startTime: string;

  @AutoMap()
  @Column({ nullable: false })
  endTime: string;

  @AutoMap()
  @Column({ type: 'float', nullable: false })
  price: number;

  @AutoMap()
  @Column({ length: 65535 })
  rule: string;

  @AutoMap()
  @ManyToOne(
    () => SportFieldTypeEntity,
    (sportFieldType) => sportFieldType.sportFields,
  )
  @JoinColumn({ name: 'sport_field_type_id' })
  sportFieldType: SportFieldTypeEntity;

  @AutoMap()
  @ManyToOne(() => UserEntity, (owner) => owner.ownedSportFields)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @OneToMany(
    () => SportFieldImageEntity,
    (sportFieldImage) => sportFieldImage.sportField,
  )
  sportFieldImages: SportFieldImageEntity[];

  @OneToOne(() => LocationEntity, (location) => location.sportField)
  location: LocationEntity;

  @OneToMany(() => FieldEntity, (field) => field.sportField)
  fields: FieldEntity[];
}

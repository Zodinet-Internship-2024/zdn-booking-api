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
import { Location } from '../../location/entities/location.entity';
import { SportFieldImageEntity } from './sport-field-image.entity';
import { SportFieldTypeEntity } from './sport-field-type.entity';

@Entity({ synchronize: true })
export class SportFieldEntity extends BaseEntity {
  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ length: 10, nullable: false })
  phone: string;

  @Column({ type: 'timestamp', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: false })
  endTime: Date;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ length: 65535 })
  rule: string;

  @ManyToOne(
    () => SportFieldTypeEntity,
    (sportFieldType) => sportFieldType.sportFields,
  )
  @JoinColumn({ name: 'sport_field_type_id' })
  sportFieldType: SportFieldTypeEntity;

  @OneToMany(
    () => SportFieldImageEntity,
    (sportFieldImage) => sportFieldImage.sportField,
  )
  sportFieldImages: SportFieldImageEntity[];

  @OneToOne(() => Location, (location) => location.sportField)
  location: Location;

  @OneToMany(() => FieldEntity, (field) => field.sportField)
  fields: FieldEntity[];
}

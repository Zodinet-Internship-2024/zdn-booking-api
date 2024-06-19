import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SportFieldEntity } from './sport-field.entity';
import { AutoMap } from '@automapper/classes';

@Entity('sport_field_image')
export class SportFieldImageEntity extends BaseEntity {
  @AutoMap()
  @Column({ nullable: false })
  name: string;

  @AutoMap()
  @Column({ nullable: false })
  url: string;

  @AutoMap()
  @ManyToOne(
    () => SportFieldEntity,
    (sportField) => sportField.sportFieldImages,
  )
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportFieldEntity;
}

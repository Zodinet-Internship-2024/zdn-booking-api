import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SportFieldEntity } from './sport-field.entity';

@Entity()
export class SportFieldImageEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(
    () => SportFieldEntity,
    (sportField) => sportField.sportFieldImages,
  )
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportFieldEntity;
}

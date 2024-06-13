import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SportField } from './sport-field.entity';

@Entity()
export class SportFieldImage extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => SportField, (sportField) => sportField.sportFieldImages)
  @JoinColumn({ name: 'sport_field_id' })
  sportField: SportField;
}

import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SportField } from './sport-field.entity';

@Entity()
export class SportFieldType extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => SportField, (sportField) => sportField.sportFieldType)
  sportFields: SportField[];
}

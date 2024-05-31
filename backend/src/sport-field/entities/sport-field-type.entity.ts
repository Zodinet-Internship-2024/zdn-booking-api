import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SportField } from './sport-field.entity';

@Entity()
export class SportFieldType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => SportField, (sportField) => sportField.sportFieldType)
    sportFields: SportField[];
}

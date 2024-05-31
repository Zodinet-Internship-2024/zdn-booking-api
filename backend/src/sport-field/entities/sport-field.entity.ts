import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SportFieldType } from './sport-field-type.entity';
import { SportFieldImage } from './sport-field-image.entity';

@Entity()
export class SportField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ length: 10, nullable: false })
  phone: string;

  @Column({ type: 'timestamptz', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: false })
  endTime: Date;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ length: 65535 })
  rule: string;

  @ManyToOne(
    () => SportFieldType,
    (sportFieldType) => sportFieldType.sportFields,
  )
  @JoinColumn({ name: 'sport_field_type_id' })
  sportFieldType: SportFieldType;

  @OneToMany(
    () => SportFieldImage,
    (sportFieldImage) => sportFieldImage.sportField,
  )
  sportFieldImages: SportFieldImage[];
  //   @Column()
  //   field_type_id: string;

  //   @Column()
  //   owner_id: string;

  //   @CreateDateColumn({
  //     type: 'timestamp',
  //     default: () => CURRENT_TIME_STAMP,
  //   })
  //   public created_at: Date;

  //   @UpdateDateColumn({
  //     type: 'timestamp',
  //     default: () => CURRENT_TIME_STAMP,
  //     onUpdate: CURRENT_TIME_STAMP,
  //   })
  //   public updated_at: Date;
}

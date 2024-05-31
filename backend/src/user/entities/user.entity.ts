import { Account } from 'src/account/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

enum UserRole {
  user = 'user',
  owner = 'owner',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ type: 'character varying', length: 52, nullable: false })
  name: string;

  @Column({
    type: 'character varying',
    length: 320,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'character varying',
    length: 10,
    unique: true,
    nullable: false,
  })
  phone: number;
  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;
  @Column({ type: 'text' })
  image_url: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  password: string;
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @Column({ type: 'uuid', nullable: false })
  created_by: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ type: 'uuid', nullable: true })
  deleted_by: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}

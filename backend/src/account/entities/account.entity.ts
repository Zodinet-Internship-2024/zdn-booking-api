import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

enum AccountType {
  manual = 'manual',
  is_google = 'is_google',
  is_facebook = 'is_facebook',
}
@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ type: 'enum', enum: AccountType, nullable: false })
  name: AccountType;
  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  created_by: string;
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ type: 'uuid', nullable: true })
  deleted_by: string;
}

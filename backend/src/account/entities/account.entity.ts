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
  id: string;
  @Column({ type: 'enum', enum: AccountType, nullable: false })
  name: AccountType;
  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}

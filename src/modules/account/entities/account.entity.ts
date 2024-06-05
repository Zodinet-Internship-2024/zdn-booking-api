import { BaseEntity } from 'src/common/entity/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

enum AccountType {
  manual = 'manual',
  is_google = 'is_google',
  is_facebook = 'is_facebook',
}
@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'enum', enum: AccountType, nullable: false })
  name: AccountType;

  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

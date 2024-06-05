import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { PROVIDER } from 'src/constants/constants';

export const userProviders = [
  {
    provide: PROVIDER.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [PROVIDER.DATA_SOURCE],
  },
];

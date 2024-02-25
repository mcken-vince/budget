import { UserEntity } from '../../entities/user.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity,
  },
];

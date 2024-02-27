import { UserEntity } from '../../core/entities/user.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity,
  },
];

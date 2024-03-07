import { UserEntity } from '@entities';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity,
  },
];

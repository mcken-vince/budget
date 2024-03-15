import { AccountEntity } from '@entities';

export const accountProviders = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useValue: AccountEntity,
  },
];

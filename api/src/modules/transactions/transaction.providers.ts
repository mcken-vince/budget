import { TransactionEntity } from '@entities';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useValue: TransactionEntity,
  },
];

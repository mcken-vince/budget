import { TransactionEntity } from '../../entities/transaction.entity';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useValue: TransactionEntity,
  },
];

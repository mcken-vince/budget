import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { transactionProviders } from './transaction.providers';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders],
})
export class TransactionModule {}

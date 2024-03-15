import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { transactionProviders } from './transaction.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { accountProviders } from '../account/account.providers';
import { AccountService } from '../account/account.service';

@Module({
  imports: [JwtModule, AccountModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    ...transactionProviders,
    AccountService,
    ...accountProviders,
    JwtService,
  ],
})
export class TransactionModule {}

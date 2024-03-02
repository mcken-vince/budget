import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { transactionProviders } from './transaction.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders, JwtService],
})
export class TransactionModule {}

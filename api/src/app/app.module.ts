import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../core/database/database.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TransactionModule } from '../modules/transactions/transaction.module';
import { BudgetModule } from '../modules/budgets/budget.module';
import { CategoryModule } from '../modules/category/category.module';
import { AccountModule } from 'src/modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    TransactionModule,
    BudgetModule,
    CategoryModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { budgetProviders } from './budget.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [JwtModule, DatabaseModule],
  controllers: [BudgetController],
  providers: [BudgetService, ...budgetProviders, JwtService],
})
export class BudgetModule {}

import { Module } from '@nestjs/common';

import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { budgetProviders } from './budget.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [BudgetController],
  providers: [BudgetService, ...budgetProviders, JwtService],
})
export class BudgetModule {}

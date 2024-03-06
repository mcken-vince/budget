import { BudgetEntity } from '../../core/entities/budget.entity';

export const budgetProviders = [
  {
    provide: 'BUDGET_REPOSITORY',
    useValue: BudgetEntity,
  },
];

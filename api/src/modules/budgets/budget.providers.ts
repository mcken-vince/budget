import { BudgetEntity } from '@entities';

export const budgetProviders = [
  {
    provide: 'BUDGET_REPOSITORY',
    useValue: BudgetEntity,
  },
];

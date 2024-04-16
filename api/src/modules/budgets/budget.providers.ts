import { BudgetEntity, BudgetItemEntity } from '@entities';

export const budgetProviders = [
  {
    provide: 'BUDGET_REPOSITORY',
    useValue: BudgetEntity,
  },
  {
    provide: 'BUDGET_ITEM_REPOSITORY',
    useValue: BudgetItemEntity,
  },
];

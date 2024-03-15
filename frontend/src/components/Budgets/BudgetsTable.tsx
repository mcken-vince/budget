'use client';

import { Table } from '@components/Table';
import { formatMoney } from '@helpers/money.helpers';

export interface BudgetsTableProps {
  budgets: any[];
  categories: any[];
  updateBudget: (newBudget: any) => void;
  removeBudget: (idBudget: string | string[]) => void;
}

export const BudgetsTable = ({
  budgets,
  categories,
  updateBudget,
  removeBudget,
}: BudgetsTableProps) => {
  return (
    <Table
      columns={[
        { name: 'Name', getValue: (row) => row.name },
        {
          name: 'Category',
          getValue: (row) =>
            categories.find((category) => category.id === row.idCategory)?.name,
        },
        { name: 'Amount', getValue: (row) => formatMoney(row.totalAmount) },
      ]}
      rows={budgets}
      removeRow={removeBudget}
      name="budget"
    />
  );
};

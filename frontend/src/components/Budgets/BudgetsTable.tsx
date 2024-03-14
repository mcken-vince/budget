'use client';

import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from '../DropdownMenu';
import { TrashIcon, PencilIcon } from '@heroicons/react/16/solid';
import { formatDate } from '@helpers';
import { CategorySelector } from '../Category/CategorySelector';
import { Table } from '@components/Table';

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
  const { data: session } = useSession();

  return (
    <Table
      columns={[
        { name: 'Name', getValue: (row) => row.name },
        {
          name: 'Category',
          getValue: (row) =>
            categories.find((category) => category.id === row.idCategory)?.name,
        },
        { name: 'Amount', getValue: (row) => `$${row.totalAmount}` },
      ]}
      rows={budgets}
      removeRow={removeBudget}
      name="budget"
    />
  );
};

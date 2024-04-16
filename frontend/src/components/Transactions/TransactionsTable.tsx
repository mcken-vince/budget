'use client';

import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from '../DropdownMenu';
import { TrashIcon, PencilIcon } from '@heroicons/react/16/solid';
import { formatDate } from '@helpers';
import { CategorySelector } from '../Category/CategorySelector';
import { Select } from '@components/Inputs/Select';
import { Table } from '@components/Table';

export interface TransactionsTableProps {
  transactions: any[];
  categories: any[];
  accounts: any[];
  updateTransaction: (newTransaction: any) => void;
}

export const TransactionsTable = ({
  transactions,
  categories,
  accounts,
  updateTransaction,
}: TransactionsTableProps) => {
  const { data: session } = useSession();

  async function callUpdateTransaction(transaction: any) {
    try {
      const response = await apiFetch(`transactions/${transaction.id}`, {
        method: 'PUT',
        data: transaction,
        token: session?.auth_token,
      });
      if (!response?.id) throw new Error('Transaction not updated');
      updateTransaction(response);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Table
      columns={[
        { name: 'Name', getValue: (row) => row.name },
        { name: 'Description', getValue: (row) => row.description },
        { name: 'Date', getValue: (row) => formatDate(row.date) },
        {
          name: 'Account',
          getValue: (row) =>
            accounts.find((account) => account.id === row.idAccount)?.name,
        },
        {
          name: 'Category',
          getValue: (row) => (
            <CategorySelector
              uniqueId={row.id}
              category={categories.find(
                (category) => category.id === row.idCategory
              )}
              categories={categories}
              updateState={(category: any) =>
                updateTransaction({
                  ...row,
                  category,
                  idCategory: category?.id,
                })
              }
            />
          ),
        },
        {
          name: 'Type',
          getValue: (row) => (
            <Select
              value={row.type}
              name="type"
              onChange={(e) => {
                callUpdateTransaction({ ...row, type: e.target.value });
              }}
              hideBlankOption
              options={[
                { label: 'Expense', value: 'expense' },
                { label: 'Income', value: 'income' },
              ]}
            />
          ),
        },
        { name: 'Amount', getValue: (row) => `$${row.amount.toFixed(2)}` },
      ]}
      name="Transactions"
      removeRow={(id) => {
        return;
      }}
      rows={transactions}
    />
  );
};

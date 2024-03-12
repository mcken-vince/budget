'use client';

import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from '../DropdownMenu';
import { TrashIcon, PencilIcon } from '@heroicons/react/16/solid';
import { formatDate } from '@helpers';
import { CategorySelector } from '../Category/CategorySelector';

export interface BudgetsTableProps {
  budgets: any[];
  categories: any[];
  updateBudget: (newBudget: any) => void;
}

export const BudgetsTable = ({
  budgets,
  categories,
  updateBudget,
}: BudgetsTableProps) => {
  const { data: session } = useSession();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2">
              <label htmlFor="SelectAll" className="sr-only">
                Select All
              </label>

              <input
                type="checkbox"
                id="SelectAll"
                className="size-5 rounded border-gray-300"
              />
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Name
            </th>

            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Start
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              End
            </th> */}

            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Amount
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {budgets?.map((budget, idx) => (
            <tr key={`budget-${idx}`} className="odd:bg-slate-50">
              <td className="px-4 py-2">
                <label className="sr-only" htmlFor={`Row${idx}`}>
                  Row {idx}
                </label>

                <input
                  className="size-5 rounded border-slate-300"
                  type="checkbox"
                  id={`Row${idx}`}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                {budget?.name}
              </td>

              {/* <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                {formatDate(budget?.startDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                {formatDate(budget?.endDate)}
              </td> */}
              {/* <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                <CategorySelector
                  uniqueId={transaction?.id}
                  category={transaction?.category}
                  categories={categories}
                  updateTransactionCategory={(category: any) =>
                    updateTransaction({
                      ...transaction,
                      category,
                      idCategory: category?.id,
                    })
                  }
                />
              </td> */}
              <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                ${budget?.totalAmount.toFixed(2)}
              </td>
              {/* <td>
                <DropdownMenu
                  uniqueId={transaction?.id}
                  items={[
                    {
                      label: 'Edit',
                      icon: PencilIcon,
                      onClick: () => {
                        console.log('Edit');
                      },
                    },
                    {
                      label: 'Delete',
                      icon: TrashIcon,
                      onClick: () => {
                        apiFetch(`transactions/${transaction?.id}`, {
                          method: 'DELETE',
                          token: session?.auth_token,
                        });
                      },
                    },
                  ]}
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../helpers/clients/fetch-client';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from '../DropdownMenu';
import { TrashIcon, PencilIcon } from '@heroicons/react/16/solid';
import { formatDate } from '../../helpers/date.helpers';
import { CategorySelector } from '../Category/CategorySelector';

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async function fetchTransactions() {
      if (session?.auth_token) {
        const response = await apiFetch('transactions', {
          token: session?.auth_token,
        });
        setTransactions(Array.isArray(response) ? response : []);
      }
    })();

    (async function fetchCategories() {
      if (session?.auth_token) {
        const response = await apiFetch('category', {
          token: session?.auth_token,
        });
        setCategories(Array.isArray(response) ? response : []);
      }
    })();
  }, [session?.auth_token]);

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
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Description
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Date
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Category
            </th>

            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Amount
            </th>
            <th className="whitespace-nowrap px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {transactions?.map((transaction, idx) => (
            <tr key={`transaction-${idx}`} className="odd:bg-slate-50">
              <td className="px-4 py-2">
                <label className="sr-only" htmlFor={`Row${idx}`}>
                  Row {idx}
                </label>

                <input
                  className="size-5 rounded border-gray-300"
                  type="checkbox"
                  id={`Row${idx}`}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                {transaction?.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                {transaction?.description}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                {formatDate(transaction?.date)}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                <CategorySelector
                  uniqueId={transaction?.id}
                  category={transaction?.category}
                  categories={categories}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                ${transaction.amount}
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

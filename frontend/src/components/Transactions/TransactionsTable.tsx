'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../helpers/clients/fetch-client';
import { useSession } from 'next-auth/react';

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async function fetchTransactions() {
      if (session?.auth_token) {
        const response = await apiFetch('transactions', {
          token: session?.auth_token,
        });
        setTransactions(response ?? []);
      }
    })();
  }, [session?.auth_token]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Description
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Date
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Amount
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction, idx) => (
            <tr key={`transaction-${idx}`} className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {transaction?.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {transaction?.description}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {transaction?.date}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                ${transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

'use client';

import { ProgressBar } from '@components/Progress';
import { formatDate } from '@helpers/date.helpers';
import { formatMoney } from '@helpers/money.helpers';
import { useMemo, useState } from 'react';

export interface BudgetOverviewProps {
  budget: any;
  total?: number;
  budgetAmount?: number;
  hideBudgetAmount?: boolean;
  transactions?: any[];
  onClick?: () => void;
  uncategorized?: boolean;
}

export const BudgetOverview = ({
  budget,
  budgetAmount = 0,
  hideBudgetAmount,
  transactions = [],
  onClick,
}: BudgetOverviewProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const spend = useMemo(
    () =>
      transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    [transactions]
  );
  const percentage = (spend / budgetAmount) * 100 || 0;
  return (
    <div
      className="hover:bg-slate-300 hover:cursor-pointer p-2 w-full"
      onClick={() => {
        if (onClick) onClick();
        if (transactions.length) setDrawerOpen((prev) => !prev);
      }}
    >
      <div className="flex justify-between mb-1">
        <h3>{budget?.name}</h3>
        <h3>
          {formatMoney(spend)}
          {hideBudgetAmount ? null : ` of ${formatMoney(budgetAmount)}`}
        </h3>
      </div>
      <ProgressBar
        progress={percentage}
        uncategorizedBudgetOverride={hideBudgetAmount}
      />
      <div
        className={`overflow-hidden transition-all duration-500 ${
          drawerOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-slate-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                  Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900 text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {transactions?.map((transaction, idx) => (
                <tr
                  key={`budget-${budget?.name}-transaction-${
                    transaction?.id || idx
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {transaction?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {formatDate(transaction?.date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-right">
                    {formatMoney(transaction?.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

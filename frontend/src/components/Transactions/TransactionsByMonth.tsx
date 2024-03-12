'use client';

import { apiFetch } from '@helpers/clients';
import { addxMonths } from '@helpers/date.helpers';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BudgetOverview } from '..';

export const TransactionsByMonth = ({ date }: any) => {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);

  const uncategorizedTransactions = transactions.filter(
    (transaction) => !transaction.idCategory
  );

  useEffect(() => {
    if (session?.auth_token) {
      (async function fetchTransactionsByMonth() {
        console.log('fetch');
        const startDate = new Date(`${date.month} 1, ${date.year}`);
        const endDate = addxMonths(1, startDate);

        const response = await apiFetch(
          `transactions/byDateRange/${startDate.toISOString()}/${endDate.toISOString()}`,
          {
            token: session?.auth_token,
          }
        );
        if (Array.isArray(response)) {
          setTransactions(response);
        }
      })();
      (async function fetchBudgets() {
        const response = await apiFetch('budget', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) {
          setBudgets(response);
        }
      })();
    }
  }, [session?.auth_token, date]);

  return (
    <div>
      {budgets.map((budget: any) => (
        <BudgetOverview
          key={`budget-${budget?.name}-${date.month + date.year}`}
          budget={budget}
          budgetAmount={budget?.totalAmount}
          transactions={transactions.filter((transaction) => {
            return transaction?.idCategory === budget?.idCategory;
          })}
        />
      ))}
      <BudgetOverview
        budget={{ name: '-- Uncategorized --' }}
        transactions={uncategorizedTransactions}
        hideBudgetAmount
      />
    </div>
  );
};

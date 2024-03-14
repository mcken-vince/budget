'use client';

import { apiFetch } from '@helpers/clients';
import { addxMonths } from '@helpers/date.helpers';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { BudgetOverview } from '..';
import { BudgetSummary } from '@components/Budgets/BudgetSummary';

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

  const budgetIncome = useMemo(() => {
    return 6000;
  }, []);
  const budgetSpending = useMemo(() => {
    return budgets.reduce((acc, budget) => acc + budget.totalAmount, 0);
  }, [budgets]);
  const actualSpending = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  }, [transactions]);

  return (
    <div className="flex flex-col md:flex-row md:gap-5">
      <BudgetSummary
        budgetIncome={budgetIncome}
        budgetSpending={budgetSpending}
      />
      <div className="grow">
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
        {!!uncategorizedTransactions?.length && (
          <BudgetOverview
            budget={{ name: '-- Uncategorized --' }}
            transactions={uncategorizedTransactions}
            hideBudgetAmount
          />
        )}
      </div>
    </div>
  );
};

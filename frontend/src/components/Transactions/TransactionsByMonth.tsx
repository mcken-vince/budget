'use client';

import { apiFetch } from '@helpers/clients';
import { addxMonths } from '@helpers/date.helpers';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { BudgetOverview } from '..';
import { BudgetSummary } from '@components/Budgets/BudgetSummary';
import { accumulate } from '@helpers/money.helpers';
import { BudgetItemForm } from '@components/Budgets/BudgetItemForm';

interface TransactionsByMonthProps {
  date: { month: string; year: number; monthNumber: number };
}

export const TransactionsByMonth = ({ date }: TransactionsByMonthProps) => {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [budget, setBudget] = useState<any>(null);
  console.log({ date });
  const uncategorizedTransactions = transactions.filter(
    (transaction) => !transaction.idCategory
  );

  const addBudgetItem = (newBudgetItem: any) => {
    setBudget((prev: any) => ({
      ...prev,
      budgetItems: [...(prev?.budgetItems || []), newBudgetItem],
    }));
  };

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
        const response = await apiFetch(
          `budget/${date.year}/${date.monthNumber}`,
          {
            token: session?.auth_token,
          }
        );
        if (response) {
          setBudget(response);
        }
      })();
      (async function fetchCategories() {
        const response = await apiFetch('category', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) {
          setCategories(response);
        }
      })();
    }
  }, [session?.auth_token, date]);

  const { budgetIncome, budgetSpending } = useMemo(() => {
    const income = accumulate(
      budget?.budgetItems,
      (b) => (b.type === 'income' ? b.amount : 0),
      0
    );
    const spending = accumulate(
      budget?.budgetItems,
      (b) => (b.type === 'expense' ? b.amount : 0),
      0
    );
    return { budgetIncome: income, budgetSpending: spending };
  }, [budget?.budgetItems]);

  const actualSpending = useMemo(() => {
    return accumulate(transactions, 'amount', 0);
  }, [transactions]);
  console.log({ categories, budget });
  return (
    <div className="flex flex-col md:flex-row md:gap-5">
      <div className="flex flex-col gap-3">
        <BudgetSummary
          budgetIncome={budgetIncome}
          budgetSpending={budgetSpending}
        />
        <div className="fit-content">
          <BudgetItemForm
            addBudgetItem={addBudgetItem}
            categories={categories}
            idBudget={budget?.id}
          />
        </div>
      </div>
      <div className="grow">
        {budget?.budgetItems?.map((budgetItem: any) => (
          <BudgetOverview
            key={`budget-${budgetItem?.name}-${date.month + date.year}`}
            budget={budgetItem}
            budgetAmount={budgetItem?.amount}
            transactions={transactions.filter((transaction) => {
              return transaction?.idCategory === budgetItem?.idCategory;
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

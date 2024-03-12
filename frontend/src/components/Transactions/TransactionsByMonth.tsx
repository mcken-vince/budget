'use client';

import { apiFetch } from '@helpers/clients';
import { addxMonths } from '@helpers/date.helpers';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BudgetOverview } from '..';
import { useRouter } from 'next/navigation';

export const TransactionsByMonth = ({ date }: any) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCateogories] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<Record<string, any>>({});

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
      (async function fetchCategories() {
        const response = await apiFetch('category', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) {
          setCateogories(response);
        }
      })();
    }
  }, [session?.auth_token, date]);

  useEffect(() => {
    const budgetObject: Record<string, any> = {};
    if (categories.length > 0 && transactions.length > 0) {
      categories.forEach((category) => {
        const relevantTransactions = transactions.filter((transaction) => {
          return transaction.idCategory === category.id;
        });
        const total = relevantTransactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        budgetObject[category.name] = {
          category,
          total,
        };
      });
    }
    setBudgets(budgetObject);
  }, [transactions, categories]);
  console.log({ budgets });
  return (
    <div>
      {Object.keys(budgets).map((key) => (
        <BudgetOverview
          key={`budget-${budgets[key].category.name}-${date.month + date.year}`}
          category={budgets[key].category}
          total={budgets[key].total}
          budgetAmount={100}
          onClick={() => {
            router.push(
              `/budgets/${budgets[key].category.name}?startDate=${date.month},1,${date.year}&endDate=${date.month},31,${date.year}`
            );
          }}
        />
      ))}
      <BudgetOverview
        category={{ name: '-- Uncategorized --' }}
        total={uncategorizedTransactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        )}
        hideBudgetAmount
      />
    </div>
  );
};

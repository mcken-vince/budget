'use client';

import { useEffect, useMemo, useState } from 'react';
import { BudgetForm } from './BudgetForm';
import { useSession } from 'next-auth/react';
import { apiFetch } from '@helpers/clients';
import { SectionHeader } from '..';
import { BudgetsTable } from './BudgetsTable';
import { addToState, removeFromState } from '@helpers/state.helpers';

export const BudgetsPage = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);

  const addBudget = useMemo(() => addToState(setBudgets), []);
  const removeBudget = useMemo(() => removeFromState(setBudgets), []);

  useEffect(() => {
    if (session?.auth_token) {
      (async function fetchCategories() {
        const response = await apiFetch('category', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) setCategories(response);
      })();
      (async function fetchBudgets() {
        const response = await apiFetch('budget', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) setBudgets(response);
      })();
    }
  }, [session?.auth_token]);

  return (
    <div>
      <SectionHeader title="Budgets">
        <BudgetForm addBudget={addBudget} categories={categories} />
      </SectionHeader>
      <BudgetsTable
        budgets={budgets}
        categories={categories}
        updateBudget={() => {
          return;
        }}
        removeBudget={removeBudget}
      />
    </div>
  );
};

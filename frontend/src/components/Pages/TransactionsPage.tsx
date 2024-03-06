'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  SectionTitle,
  TransactionForm,
  CategoryForm,
  TransactionsTable,
} from '../../components';
import { addToState, updateState } from '@helpers';
import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';

export default function TransactionsPage() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const addCategory = useMemo(() => addToState(setCategories), []);
  const addTransaction = useMemo(() => addToState(setTransactions), []);
  const updateTransaction = useMemo(() => updateState(setTransactions), []);

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
    <div>
      <div className="flex flex-row justify-between">
        <SectionTitle>Transactions</SectionTitle>
        <div>
          <CategoryForm addCategory={addCategory} />
          <TransactionForm addTransaction={addTransaction} />
        </div>
      </div>
      <TransactionsTable
        categories={categories}
        transactions={transactions}
        updateTransaction={updateTransaction}
      />
    </div>
  );
}

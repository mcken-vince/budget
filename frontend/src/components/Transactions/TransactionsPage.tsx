'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  TransactionForm,
  CategoryForm,
  TransactionsTable,
  SectionHeader,
} from '../../components';
import { addToState, updateState } from '@helpers';
import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';

export default function TransactionsPage() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);

  const addCategory = useMemo(() => addToState(setCategories), []);
  const addTransaction = useMemo(() => addToState(setTransactions), []);
  const updateTransaction = useMemo(() => updateState(setTransactions), []);

  useEffect(() => {
    if (session?.auth_token) {
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
      (async function fetchAccounts() {
        if (session?.auth_token) {
          const response = await apiFetch('account', {
            token: session?.auth_token,
          });
          setAccounts(Array.isArray(response) ? response : []);
        }
      })();
    }
  }, [session?.auth_token]);

  return (
    <div>
      <SectionHeader title="Transactions">
        <>
          <CategoryForm addCategory={addCategory} categories={categories} />
          <TransactionForm
            addTransaction={addTransaction}
            accounts={accounts}
          />
        </>
      </SectionHeader>

      <TransactionsTable
        categories={categories}
        transactions={transactions}
        updateTransaction={updateTransaction}
      />
    </div>
  );
}

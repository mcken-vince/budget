'use client';

import { useEffect, useMemo, useState } from 'react';
import { AccountForm } from './AccountForm';
import { useSession } from 'next-auth/react';
import { apiFetch } from '@helpers/clients';
import { SectionHeader } from '..';
import { addToState, removeFromState } from '@helpers/state.helpers';
import { AccountsTable } from './AccountsTable';

export const AccountsPage = () => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<any[]>([]);

  const addAccount = useMemo(() => addToState(setAccounts), []);
  const removeAccount = useMemo(() => removeFromState(setAccounts), []);

  useEffect(() => {
    if (session?.auth_token) {
      (async function fetchAccounts() {
        const response = await apiFetch('account', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) setAccounts(response);
      })();
    }
  }, [session?.auth_token]);

  return (
    <div>
      <SectionHeader title="Accounts">
        <AccountForm addAccount={addAccount} />
      </SectionHeader>
      <AccountsTable accounts={accounts} removeAccount={removeAccount} />
    </div>
  );
};

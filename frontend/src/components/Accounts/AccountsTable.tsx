'use client';

import { Table } from '@components/Table';
import { formatMoney } from '@helpers/money.helpers';

export interface AccountsTableProps {
  accounts: any[];
  removeAccount: (idAccount: string | string[]) => void;
}

export const AccountsTable = ({
  accounts,
  removeAccount,
}: AccountsTableProps) => {
  return (
    <Table
      columns={[
        { name: 'Name', getValue: (row) => row.name },
        {
          name: 'Balance',
          getValue: (row) => formatMoney(row.balance),
        },
      ]}
      rows={accounts}
      removeRow={removeAccount}
      name="account"
    />
  );
};

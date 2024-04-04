'use client';

import { Table } from '@components/Table';
import { formatMoney } from '@helpers/money.helpers';
import { capitalize } from '@helpers/string.helpers';

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
        { name: 'Type', getValue: (row) => capitalize(row.type) },
        {
          name: 'Balance',
          getValue: (row) => formatMoney(row.currentBalance),
        },
      ]}
      rows={accounts}
      removeRow={removeAccount}
      name="account"
    />
  );
};

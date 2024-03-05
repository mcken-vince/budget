import { TransactionForm, TransactionsTable } from '../../components';

export default function TransactionsPage() {
  return (
    <div>
      <div className="flex flex-row justify-end">
        <TransactionForm />
      </div>
      <TransactionsTable />
    </div>
  );
}

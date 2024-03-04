import { TransactionForm } from '../../components/TransactionForm';
import { TransactionsTable } from '../../components/TransactionsTable';

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

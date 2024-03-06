import {
  SectionTitle,
  TransactionForm,
  CategoryForm,
  TransactionsTable,
} from '../../components';

export default function TransactionsPage() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <SectionTitle>Transactions</SectionTitle>
        <div>
          <CategoryForm />
          <TransactionForm />
        </div>
      </div>
      <TransactionsTable />
    </div>
  );
}

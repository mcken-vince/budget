export interface BudgetSummaryProps {
  budgetIncome: number;
  budgetSpending: number;
}

export const BudgetSummary = ({
  budgetIncome,
  budgetSpending,
}: BudgetSummaryProps) => {
  const remaining = budgetIncome - budgetSpending;
  const remainingTextColor = remaining < 0 ? 'text-red-400' : 'text-green-400';
  return (
    <div className="bg-slate-200 p-2">
      <h2 className="text-2xl font-bold mb-4">Budget Summary</h2>
      <div className="flex justify-between md:flex-col">
        <div className="flex flex-col md:flex-row justify-between text-green-400">
          <h3 className="text-lg font-bold">Income</h3>
          <p className="text-2xl font-bold">${budgetIncome.toFixed(2)}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-red-400">
          <h3 className="text-lg font-bold">Total Spending</h3>
          <p className="text-2xl font-bold">-${budgetSpending.toFixed(2)}</p>
        </div>
        <span className="hidden md:flex">
          <span className="h-px flex-1 bg-black"></span>
        </span>
        <div
          className={`flex flex-col md:flex-row justify-between ${remainingTextColor}`}
        >
          <h3 className="text-lg font-bold">Remaining</h3>
          <p className="text-2xl font-bold">
            {remaining < 0 ? '-' : ''}${remaining.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

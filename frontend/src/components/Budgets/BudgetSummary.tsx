export interface BudgetSummaryProps {
  totalAmount: number;
  totalSpent: number;
}

export const BudgetSummary = ({
  totalAmount,
  totalSpent,
}: BudgetSummaryProps) => {
  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Budget Summary</h2> */}
      <div className="flex justify-between md:flex-col md:gap-2">
        <div>
          <h3 className="text-lg font-bold">Total Budget</h3>
          <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Total Spent</h3>
          <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Remaining</h3>
          <p className="text-2xl font-bold">
            ${(totalAmount - totalSpent).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

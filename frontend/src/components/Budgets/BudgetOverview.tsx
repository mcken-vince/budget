'use client';

import { ProgressBar } from '@components/Progress';
import { useRouter } from 'next/navigation';

export interface BudgetOverviewProps {
  category: any;
  total?: number;
  budgetAmount?: number;
  hideBudgetAmount?: boolean;
  onClick?: () => void;
}

export const BudgetOverview = ({
  category,
  total = 0,
  budgetAmount = 0,
  hideBudgetAmount,
  onClick,
}: BudgetOverviewProps) => {
  const router = useRouter();
  const percentage = (total / budgetAmount) * 100 || 0;
  return (
    <div
      className="hover:bg-sky-100 hover:cursor-pointer p-2"
      onClick={onClick}
    >
      <div className="flex justify-between mb-1">
        <h3>{category.name}</h3>
        <h3>
          ${total}
          {hideBudgetAmount ? null : ` of ${budgetAmount}`}
        </h3>
      </div>
      <ProgressBar progress={percentage} />
    </div>
  );
};

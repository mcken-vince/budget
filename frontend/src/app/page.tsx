'use client';

import { addxMonths, getMonthYearObject } from '@helpers/date.helpers';
import { useMemo, useState } from 'react';
import { TransactionsByMonth } from '@components';

export default function Index() {
  const year = new Date().getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const getDates = (count = 12) => {
    const dates: { month: string; year: number; monthNumber: number }[] = [];
    let i = 0;
    while (i < count) {
      const d = addxMonths(i, startOfYear);
      dates.push(getMonthYearObject(d));
      i++;
    }
    return dates;
  };

  const dates = useMemo(() => getDates(), []);
  const [selectedDate, setSelectedDate] = useState<{
    month: string;
    year: number;
    monthNumber: number;
  }>(getDates(1)[0]);

  const datesMatch = (
    a: { month: string; year: number; monthNumber: number },
    b: { month: string; year: number; monthNumber: number }
  ) => {
    return a.month === b.month && a.year === b.year;
  };

  return (
    <div>
      <div>
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>

          <select
            id="Tab"
            className="w-full rounded-md border-gray-200"
            value={selectedDate.month + ' ' + selectedDate.year}
            onChange={(e) => {
              const month = e.target.value.split(' ')[0];
              const year = parseInt(e.target.value.split(' ')[1]);
              const monthNumber =
                new Date(`${month} 1, ${year}`).getMonth() + 1;
              setSelectedDate({
                month,
                year,
                monthNumber,
              });
            }}
          >
            {dates.map((date) => {
              const dateString = date.month + ' ' + date.year;
              return (
                <option key={date.month + '-' + date.year} value={dateString}>
                  {dateString}
                </option>
              );
            })}
          </select>
        </div>

        <div className="hidden sm:block">
          <nav className="flex justify-between" aria-label="Tabs">
            {dates.map((date) => {
              const isSelected = datesMatch(date, selectedDate);
              return (
                <button
                  key={date.month + '-' + date.year}
                  className={`shrink-0 flex flex-col rounded-lg p-2 text-sm font-medium text-slate-600 hover:text-sky-700 ${
                    isSelected ? 'bg-sky-100' : 'hover:bg-sky-50'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.month.slice(0, 3).toUpperCase()}
                  {isSelected && <span>{date.year}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <TransactionsByMonth date={selectedDate} />
    </div>
  );
}

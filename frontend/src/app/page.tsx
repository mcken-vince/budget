'use client';

import { addxMonths, getMonthYearObject } from '@helpers/date.helpers';
import { useMemo, useState } from 'react';

export default function Index() {
  const getDates = (count = 12) => {
    const interval = 'month';
    const dates: { month: string; year: number }[] = [];
    let i = 0;
    while (i < count) {
      const d = addxMonths(i);
      dates.push(getMonthYearObject(d));
      i++;
    }
    return dates;
  };

  const dates = useMemo(() => getDates(), []);
  const [selectedDate, setSelectedDate] = useState<{
    month: string;
    year: number;
  }>(getDates(1)[0]);

  const datesMatch = (
    a: { month: string; year: number },
    b: { month: string; year: number }
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

          <select id="Tab" className="w-full rounded-md border-gray-200">
            {dates.map((date) => (
              <option
                selected={datesMatch(date, selectedDate)}
                key={date.month + '-' + date.year}
              >
                {date.month} {date.year}
              </option>
            ))}
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
    </div>
  );
}

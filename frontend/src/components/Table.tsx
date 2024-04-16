'use client';

import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';
import { TrashIcon } from '@heroicons/react/16/solid';
import { ReactNode, useState } from 'react';
import { usePopup } from '@hooks/usePopup';

export interface TableProps {
  name: string;
  rows: any[];
  columns: {
    name: string;
    getValue: (row: any) => string | number | ReactNode;
  }[];
  removeRow: (idRow: string | string[]) => void;
}

export const Table = ({ name, columns, rows, removeRow }: TableProps) => {
  const { data: session } = useSession();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { openPopup } = usePopup();

  const deleteSelectedRows = async () => {
    console.log('Deleting selected rows');
    const deletedIds: string[] = [];
    for (const id of selectedRows) {
      const response = await apiFetch(`${name}/${id}`, {
        method: 'DELETE',
        token: session?.auth_token,
      });
      if (response?.success) {
        deletedIds.push(id);
        console.log('Row deleted');
        openPopup({ title: 'Row successfully deleted!', type: 'success' });
      } else {
        console.error(`Error deleting row: ${id}`);
        openPopup({ title: 'Error deleting row', type: 'error' });
      }
    }
    console.log('Removing rows from state: ', deletedIds);
    removeRow(deletedIds);
    setSelectedRows([]);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-h-10">
        <button
          disabled={!selectedRows?.length}
          onClick={deleteSelectedRows}
          className="text-slate-300  border-2 enabled:border-rose-600 enabled:bg-rose-200 enabled:text-rose-600 rounded px-3 py-1"
        >
          <span className="flex gap-2 text-sm items-center">
            <TrashIcon className="h-6 w-6" />
            Delete
          </span>
        </button>
      </div>

      <table className="min-w-full divide-y-2 divide-slate-200 bg-white text-sm">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2">
              <label htmlFor="SelectAll" className="sr-only">
                Select All
              </label>

              <input
                type="checkbox"
                id="SelectAll"
                className="size-5 rounded border-slate-300"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(rows?.map((row) => row.id));
                  } else {
                    setSelectedRows([]);
                  }
                }}
                checked={
                  selectedRows.length !== 0 &&
                  selectedRows.length === rows.length
                }
              />
            </th>
            {columns.map((column, idx) => (
              <th
                key={`column-header-${column.name || idx}`}
                className="whitespace-nowrap px-4 py-2 font-medium text-slate-900"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {rows?.map((row, idx) => (
            <tr key={`${name}-${row?.id}`} className="odd:bg-slate-50">
              <td className="px-4 py-2">
                <label className="sr-only" htmlFor={`Row${idx}`}>
                  Row {idx}
                </label>

                <input
                  className="size-5 rounded border-gray-300"
                  type="checkbox"
                  id={`Row${idx}`}
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows((prev) => [...prev, row.id]);
                    } else {
                      setSelectedRows((prev) => {
                        return prev.filter((id) => id !== row.id);
                      });
                    }
                  }}
                />
              </td>
              {columns.map((column, idx) => (
                <td
                  key={`row-${row?.id}-col-${column.name || idx}`}
                  className="whitespace-nowrap px-4 py-2 font-medium text-slate-900"
                >
                  {column.getValue(row)}
                </td>
              ))}
              {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
               <IconButton onClick={}>
                  <PencilIcon className="h-6 w-6" />
                </IconButton>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

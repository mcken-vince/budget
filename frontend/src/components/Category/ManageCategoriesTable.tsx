'use client';

import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';
import { TrashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { formatDate } from '@helpers/date.helpers';

export interface ManageCategoriesTableProps {
  categories: any[];
  removeCategory: (idCategory: string | string[]) => void;
}

export const ManageCategoriesTable = ({
  categories,
  removeCategory,
}: ManageCategoriesTableProps) => {
  const { data: session } = useSession();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const deleteSelectedCategories = async () => {
    console.log('Deleting selected categories');
    const deletedIds: string[] = [];
    for (const idCategory of selectedCategories) {
      console.log(`Deleting category: ${idCategory}`);
      const response = await apiFetch(`category/${idCategory}`, {
        method: 'DELETE',
        token: session?.auth_token,
      });
      if (response?.success) {
        deletedIds.push(idCategory);
        console.log('Category deleted');
      } else {
        console.error(`Error deleting category: ${idCategory}`);
      }
    }
    console.log('Removing categories from state: ', deletedIds);
    removeCategory(deletedIds);
    setSelectedCategories([]);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-h-10">
        <button
          disabled={!selectedCategories?.length}
          onClick={deleteSelectedCategories}
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
                    setSelectedCategories(
                      categories?.map((category) => category.id)
                    );
                  } else {
                    setSelectedCategories([]);
                  }
                }}
                checked={
                  selectedCategories.length !== 0 &&
                  selectedCategories.length === categories.length
                }
              />
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Parent Category
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
              Created
            </th>
            {/* <th className="whitespace-nowrap px-4 py-2"></th> */}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {categories?.map((category, idx) => (
            <tr key={`category-${category?.id}`} className="odd:bg-slate-50">
              <td className="px-4 py-2">
                <label className="sr-only" htmlFor={`Row${idx}`}>
                  Row {idx}
                </label>

                <input
                  className="size-5 rounded border-gray-300"
                  type="checkbox"
                  id={`Row${idx}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories((prev) => [...prev, category.id]);
                    } else {
                      setSelectedCategories((prev) => {
                        return prev.filter((id) => id !== category.id);
                      });
                    }
                  }}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                {category?.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                {category?.parent?.name || '--'}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                {formatDate(category?.createdAt)}
              </td>
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

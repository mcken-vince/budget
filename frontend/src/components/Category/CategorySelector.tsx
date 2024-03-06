'use client';

import { apiFetch } from '@helpers/clients';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export const CategorySelector = ({
  uniqueId,
  category,
  categories,
}: {
  uniqueId: string;
  category: any;
  categories: any[];
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const updateCategory = async (e: any) => {
    const idCategory = e.target.value === '' ? null : e.target.value;

    try {
      setLoading(true);
      const response = await apiFetch(`transactions/${uniqueId}/category`, {
        method: 'PUT',
        data: { idCategory },
        token: session?.auth_token,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Updating...</p>;

  return (
    <div>
      <select
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        onChange={updateCategory}
        value={category?.id}
      >
        <option value=""></option>
        {categories?.map((category, idx) => (
          <option
            key={`${uniqueId}-categorySelector-option-${category.name}`}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

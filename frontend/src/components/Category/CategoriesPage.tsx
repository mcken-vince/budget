'use client';

import { useSession } from 'next-auth/react';
import { CategoryForm, ManageCategoriesTable, SectionHeader } from '..';
import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '@helpers/clients';
import { addToState, removeFromState } from '@helpers/state.helpers';

export const CategoriesPage = () => {
  const { data: session } = useSession();

  const [categories, setCategories] = useState<any[]>([]);

  const addCategory = useMemo(() => addToState(setCategories), []);
  const removeCategory = useMemo(() => removeFromState(setCategories), []);

  useEffect(() => {
    if (session) {
      (async function fetchCategories() {
        const response = await apiFetch('category', {
          token: session?.auth_token,
        });
        if (Array.isArray(response)) {
          setCategories(response);
        }
      })();
    }
  }, [session]);

  return (
    <div>
      <SectionHeader title="Categories">
        <CategoryForm addCategory={addCategory} />
      </SectionHeader>
      <ManageCategoriesTable
        categories={categories}
        removeCategory={removeCategory}
      />
    </div>
  );
};

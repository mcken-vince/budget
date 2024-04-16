'use client';

import { formatDate } from '@helpers/date.helpers';
import { Table } from '@components/Table';

export interface ManageCategoriesTableProps {
  categories: any[];
  removeCategory: (idCategory: string | string[]) => void;
}

export const ManageCategoriesTable = ({
  categories,
  removeCategory,
}: ManageCategoriesTableProps) => {
  return (
    <Table
      columns={[
        { name: 'Name', getValue: (category) => category?.name },
        {
          name: 'Parent Category',
          getValue: (category) =>
            categories.find((c) => c.id === category.idParent)?.name || '--',
        },
        {
          name: 'Created',
          getValue: (category) => formatDate(category?.createdAt),
        },
      ]}
      name="category"
      removeRow={removeCategory}
      rows={categories}
    />
  );
};

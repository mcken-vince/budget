'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../Buttons/Button';
import { Input } from '../Inputs/Input';
import { apiFetch } from '@helpers/clients';
import { Modal } from '../Modal';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePopup } from '@hooks';
import { Select } from '@components/Inputs/Select';

export interface BudgetItemFormProps {
  addBudgetItem: (newBudget: any) => void;
  categories: any[];
  idBudget: number;
}

export const BudgetItemForm = ({
  addBudgetItem,
  categories,
  idBudget,
}: BudgetItemFormProps) => {
  console.log({ idBudget });
  const createBudgetItemSchema = yup.object().shape({
    name: yup
      .string()
      .min(1, 'Name is required')
      .max(255)
      .required('Name is required'),
    amount: yup.number().required('Total amount is required'),
    idCategory: yup
      .number()
      .min(1, 'Please select a category')
      .required('Category is required'),
    type: yup
      .string()
      .oneOf(['expense', 'income'])
      .required('Type is required'),
  });
  const { data: session } = useSession();
  const { openPopup } = usePopup();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBudgetItemSchema),
    // defaultValues: {
    //   type: 'expense',
    //   name: '',
    //   amount: 0,
    //   idCategory: 0,
    // },
  });

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!showForm) reset();
  }, [showForm, reset]);
  console.log({ categories });
  const onSubmitHandler = async (data: any) => {
    try {
      const input = { ...data, idBudget };
      console.log({ input });
      const response = await apiFetch('budget/item', {
        method: 'POST',
        data: input,
        token: session?.auth_token + '',
      });
      if (!response) throw new Error('Budget not created');

      addBudgetItem(response);
      setShowForm(false);
      openPopup({ title: 'New budget added!', type: 'success' });
    } catch (error) {
      console.log({ error });
      openPopup({ title: 'Error adding budget!', type: 'error' });
    }
  };

  return (
    <>
      <Button onClick={() => setShowForm(true)}>New Budget Item</Button>
      <Modal
        title="New Budget Item"
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit(onSubmitHandler, (errors) =>
          console.log(errors)
        )}
        closeButtonText="Cancel"
      >
        <form
          className="mt-8 grid grid-cols-6 gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="col-span-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  value={field.value}
                  onChange={field.onChange}
                  label="Name"
                  name="name"
                  type="text"
                  error={errors?.name?.message}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Amount"
                  name="amount"
                  type="number"
                  error={errors?.amount?.message}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  hideBlankOption
                  options={[
                    {
                      label: 'Expense',
                      value: 'expense',
                    },
                    {
                      label: 'Income',
                      value: 'income',
                    },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  label="Type"
                  name="type"
                  error={errors?.type?.message}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="idCategory"
              control={control}
              render={({ field }) => (
                <Select
                  options={categories?.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  label="Category"
                  name="name"
                  error={errors?.idCategory?.message}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

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

export interface BudgetFormProps {
  addBudget: (newCategory: any) => void;
  categories: any[];
}

export const BudgetForm = ({ addBudget, categories }: BudgetFormProps) => {
  const createBudgetSchema = yup.object().shape({
    name: yup
      .string()
      .min(1, 'Name is required')
      .max(255)
      .required('Name is required'),
    year: yup
      .number()
      .min(2000, 'Invalid value')
      .max(2100, 'Invalid value')
      .required('Year is required.'),
    month: yup
      .number()
      .min(1, 'Month is required')
      .max(12, 'Month is required')
      .required('Month is required'),
    totalAmount: yup.number().required('Total amount is required'),
  });
  const { data: session } = useSession();
  const { openPopup } = usePopup();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBudgetSchema),
    defaultValues: {
      name: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      totalAmount: 0,
    },
  });

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!showForm) reset();
  }, [showForm, reset]);

  const onSubmitHandler = async (data: any) => {
    try {
      console.log({ data });
      const response = await apiFetch('budget', {
        method: 'POST',
        data,
        token: session?.auth_token + '',
      });
      if (!response) throw new Error('Budget not created');
      addBudget(response);
      setShowForm(false);
      openPopup({ title: 'New budget added!', type: 'success' });
    } catch (error) {
      console.log({ error });
      openPopup({ title: 'Error adding budget!', type: 'error' });
    }
  };
  console.log({ categories });
  return (
    <>
      <Button onClick={() => setShowForm(true)}>New Budget</Button>
      <Modal
        title="New Budget"
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit(onSubmitHandler)}
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
              name="totalAmount"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Amount"
                  name="amount"
                  type="number"
                  error={errors?.totalAmount?.message}
                />
              )}
            />
          </div>
          {/* <div className="col-span-6">
            <Controller
              name="idCategory"
              control={control}
              render={({ field }) => (
                <Select
                  options={categories
                    ?.filter((category) => !category.idParent)
                    .map((category) => ({
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
          </div> */}
          <div className="col-span-6">
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={field.onChange}
                  min={new Date().getFullYear() - 10}
                  max={new Date().getFullYear() + 10}
                  value={field.value}
                  label="Year"
                  name="year"
                  type="number"
                  error={errors?.year?.message}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  label="Month"
                  name="month"
                  blankOptionValue={0}
                  options={[
                    { label: 'January', value: 1 },
                    { label: 'February', value: 2 },
                    { label: 'March', value: 3 },
                    { label: 'April', value: 4 },
                    { label: 'May', value: 5 },
                    { label: 'June', value: 6 },
                    { label: 'July', value: 7 },
                    { label: 'August', value: 8 },
                    { label: 'September', value: 9 },
                    { label: 'October', value: 10 },
                    { label: 'November', value: 11 },
                    { label: 'December', value: 12 },
                  ]}
                  error={errors?.month?.message}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

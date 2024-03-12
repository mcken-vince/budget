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
    name: yup.string().min(1).max(255).required('Name is required.'),
    startDate: yup.date().required('Start date is required.'),
    endDate: yup.date().required('End date is required.'),
    totalAmount: yup.number().required('Total amount is required.'),
    idCategory: yup.number().nullable(),
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
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
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
          <div className="col-span-6">
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
                  error={errors?.name?.message}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Input
                  value={
                    typeof field?.value === 'string' ||
                    typeof field?.value === 'undefined'
                      ? field.value
                      : field.value.toLocaleDateString('en-CA')
                  }
                  onChange={field.onChange}
                  label="Start Date"
                  name="date"
                  type="date"
                  error={errors?.startDate?.message}
                />
              )}
            />
          </div>{' '}
          <div className="col-span-6">
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Input
                  value={
                    typeof field?.value === 'string' ||
                    typeof field?.value === 'undefined'
                      ? field.value
                      : field.value.toLocaleDateString('en-CA')
                  }
                  onChange={field.onChange}
                  label="End Date"
                  name="enddate"
                  type="date"
                  error={errors?.endDate?.message}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

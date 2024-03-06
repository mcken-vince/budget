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

export interface TransactionFormProps {
  addTransaction: (newTransaction: any) => void;
}

export const TransactionForm = ({ addTransaction }: TransactionFormProps) => {
  const createTransactionSchema = yup.object().shape({
    idBudget: yup.number().nullable(),
    name: yup.string().min(1).max(255).required('Name is required.'),
    description: yup.string(),
    date: yup.date().required('Date is required.'),
    amount: yup
      .number()
      .required('Amount is required.')
      .transform((value) => parseFloat(value.toFixed(2))),
  });
  const { data: session } = useSession();
  const { openPopup } = usePopup();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTransactionSchema),
    defaultValues: {
      idBudget: null,
      name: '',
      description: '',
      date: new Date(),
      amount: 0.0,
    },
  });

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!showForm) reset();
  }, [showForm, reset]);

  const onSubmitHandler = async (data: any) => {
    try {
      console.log({ data });
      const response = await apiFetch('transactions', {
        method: 'POST',
        data,
        token: session?.auth_token + '',
      });
      console.log({ response });
      addTransaction(response);
      openPopup({ title: 'New Transaction added!', type: 'success' });
    } catch (error) {
      console.log({ error });
      openPopup({ title: 'Error adding transaction!', type: 'error' });
    }
  };
  return (
    <>
      <Button onClick={() => setShowForm(true)}>New Transaction</Button>
      <Modal
        title="New Transaction"
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit(onSubmitHandler)}
        closeButtonText="Cancel"
      >
        <form className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
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
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Description"
                  name="description"
                  type="text"
                  error={errors?.description?.message}
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
              name="date"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Date"
                  name="date"
                  type="date"
                  error={errors?.date?.message}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

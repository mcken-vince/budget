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
import { Select } from '../Inputs/Select';
import { capitalize } from '@helpers/string.helpers';

export interface AccountFormProps {
  addAccount: (newCategory: any) => void;
}

export const AccountForm = ({ addAccount }: AccountFormProps) => {
  const createAccountSchema = yup.object().shape({
    type: yup
      .string()
      .min(1, 'Please select an account type.')
      .max(50, 'Invalid type selection.')
      .required('Type is required.'),
    initialBalance: yup
      .number()
      .min(0)
      .required('Initial balance is required.'),
    name: yup.string().min(1).max(50).required('Name is required.'),
  });
  const { data: session } = useSession();
  const { openPopup } = usePopup();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      name: '',
      initialBalance: 0,
      type: 'cash',
    },
  });

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!showForm) reset();
  }, [showForm, reset]);

  const onSubmitHandler = async (data: any) => {
    try {
      console.log({ data });
      const response = await apiFetch('account', {
        method: 'POST',
        data,
        token: session?.auth_token + '',
      });
      if (!response) throw new Error('Account not created');
      if (response.statusCode) throw new Error(response.message);
      addAccount(response);
      setShowForm(false);
      openPopup({ title: 'New account added!', type: 'success' });
    } catch (error) {
      console.log({ error });
      openPopup({
        title: 'Error adding account!',
        type: 'error',
      });
    }
  };
  return (
    <>
      <Button onClick={() => setShowForm(true)}>New Account</Button>
      <Modal
        title="New Account"
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
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue('name', `${capitalize(e.target.value)}`.trim());
                  }}
                  label="Account Type"
                  name="type"
                  error={errors?.type?.message}
                  options={[
                    { label: 'Cash', value: 'cash' },
                    { label: 'Chequing', value: 'chequing' },
                    { label: 'Savings', value: 'savings' },
                    { label: 'Other', value: 'other' },
                  ]}
                />
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              name="initialBalance"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  label="Initial Balance"
                  name="initialBalance"
                  type="number"
                  error={errors?.initialBalance?.message}
                />
              )}
            />
          </div>
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
        </form>
      </Modal>
    </>
  );
};

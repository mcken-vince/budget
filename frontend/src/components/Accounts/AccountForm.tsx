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

export interface AccountFormProps {
  addAccount: (newCategory: any) => void;
}

export const AccountForm = ({ addAccount }: AccountFormProps) => {
  const createAccountSchema = yup.object().shape({
    name: yup.string().min(1).max(50).required('Name is required.'),
    balance: yup.number().min(0).required('Balance is required.'),
  });
  const { data: session } = useSession();
  const { openPopup } = usePopup();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      name: '',
      balance: 0,
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
      addAccount(response);
      setShowForm(false);
      openPopup({ title: 'New account added!', type: 'success' });
    } catch (error) {
      console.log({ error });
      openPopup({ title: 'Error adding account!', type: 'error' });
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
              name="balance"
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  value={field.value}
                  onChange={field.onChange}
                  label="Balance"
                  name="balance"
                  type="number"
                  error={errors?.balance?.message}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

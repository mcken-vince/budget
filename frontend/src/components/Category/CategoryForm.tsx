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

export interface CategoryFormProps {
  addCategory: (newCategory: any) => void;
}

export const CategoryForm = ({ addCategory }: CategoryFormProps) => {
  const createCategorySchema = yup.object().shape({
    name: yup.string().min(1).max(255).required('Name is required.'),
  });
  const { data: session } = useSession();
  const { openPopup } = usePopup();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (!showForm) reset();
  }, [showForm, reset]);

  const onSubmitHandler = async (data: any) => {
    try {
      console.log({ data });
      const response = await apiFetch('category', {
        method: 'POST',
        data,
        token: session?.auth_token + '',
      });
      if (!response) throw new Error('Category not created');
      addCategory(response);
      setShowForm(false);
      openPopup({ title: 'New category added!', type: 'success' });
    } catch (error) {
      console.log({ error });
      openPopup({ title: 'Error adding category!', type: 'error' });
    }
  };
  return (
    <>
      <Button onClick={() => setShowForm(true)}>New Category</Button>
      <Modal
        title="New Category"
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
        </form>
      </Modal>
    </>
  );
};

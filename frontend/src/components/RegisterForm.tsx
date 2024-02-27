'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Input } from './Input';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const RegisterForm = () => {
  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required('First name is required.'),
      lastName: yup.string().required('Last name is required.'),
      email: yup.string().required('Email is required.'),
      password: yup
        .string()
        .min(6, 'Password must contain at least 6 characters.')
        .required('Password is required.'),
    })
    .typeError('Invalid value');

  const { control, handleSubmit } = useForm({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
    resolver: yupResolver(schema),
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (data: any) => {
    console.log({ data });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="First Name"
                    name="first-name"
                    autoComplete="given-name"
                    required
                    placeholder="First Name"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    name="last-name"
                    autoComplete="family-name"
                    required
                    placeholder="Last Name"
                  />
                )}
              />
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                />
              )}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>

          <div>
            <span>
              Already have an account?{' '}
              <Link className="hover:underline" href="/login">
                Login here
              </Link>
              .
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

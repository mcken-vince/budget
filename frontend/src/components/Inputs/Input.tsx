'use client';

import { ChangeEvent } from 'react';
import { InputErrorMessage } from './InputErrorMessage';

export interface InputProps {
  name: string;
  label?: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputType;
  autoComplete?: string;
  error?: string;
}

export const Input = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  error,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`mt-1 p-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm${
          error ? ' border-2 border-rose-600' : ''
        }`}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      <InputErrorMessage error={error} />
    </div>
  );
};

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

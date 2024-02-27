'use client';

import { ChangeEvent } from 'react';

export interface InputProps {
  name: string;
  label?: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: InputType;
  autoComplete?: string;
}

export const Input = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  autoComplete,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
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

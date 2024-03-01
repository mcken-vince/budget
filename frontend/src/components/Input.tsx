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
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className="mt-1 p-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
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

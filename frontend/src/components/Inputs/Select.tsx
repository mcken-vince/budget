import { ChangeEvent } from 'react';
import { InputErrorMessage } from './InputErrorMessage';

export interface SelectProps {
  name: string;
  label?: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  options: { value: any; label: string }[];
  hideBlankOption?: boolean;
  blankOptionValue?: string | number | readonly string[] | undefined;
}

export const Select = ({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  hideBlankOption = false,
  blankOptionValue = '',
}: SelectProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>

      <select
        name={name}
        id={name}
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        onChange={onChange}
        value={value}
      >
        {!hideBlankOption && (
          <option value={blankOptionValue}>
            {placeholder ?? 'Please select'}
          </option>
        )}
        {options?.map((option, idx) => (
          <option key={`select-${name}-option-${idx}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <InputErrorMessage error={error} />
    </div>
  );
};

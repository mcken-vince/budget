import { ReactNode, useMemo } from 'react';

export type ButtonProps = {
  children: ReactNode | string;
  onClick?: (e: any) => void;
  variant?: 'solid' | 'border';
  type?: 'button' | 'reset' | 'submit';
  color?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

export function Button({
  children,
  onClick,
  variant = 'solid',
  type = 'button',
  color = 'primary',
  disabled = false,
}: ButtonProps) {
  const buttonClasses = useMemo(() => {
    let btnClasses =
      'inline-block rounded border px-5 py-3 text-sm font-medium focus:outline-none focus:ring disabled:bg:gray-300 disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-300 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-colors duration-150 ease-in-out';
    switch (color) {
      case 'secondary':
        if (variant === 'border') {
          btnClasses +=
            ' bg-white text-slate-700 hover:bg-slate-200 active:bg-slate-400 border-slate-300';
        } else {
          btnClasses +=
            ' bg-slate-300 text-slate-700 hover:bg-slate-400 active:bg-slate-500';
        }
        break;
      case 'danger':
        if (variant === 'border') {
          btnClasses +=
            ' bg-white text-rose-800 hover:bg-red-200 active:bg-red-400 border-rose-00';
        } else {
          btnClasses +=
            ' bg-red-300 text-rose-800 hover:bg-red-400 active:bg-red-500';
        }
        break;
      default:
        if (variant === 'border') {
          btnClasses +=
            ' bg-white text-indigo-800 hover:bg-indigo-200 active:bg-indigo-400';
        } else {
          btnClasses +=
            ' bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 border-indigo-600';
        }
    }
    return btnClasses;
  }, [color, variant]);

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

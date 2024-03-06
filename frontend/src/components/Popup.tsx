'use client';

import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/16/solid';
import { useMemo } from 'react';

export type PopupType = 'error' | 'success' | 'notify';

export interface PopupProps {
  title: string;
  subText?: string;
  type: PopupType;
  closePopup: () => void;
  open: boolean;
}

export const Popup = ({
  open,
  title,
  subText,
  type,
  closePopup,
}: PopupProps) => {
  const iconMap = useMemo(
    () => ({
      success: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
      error: <XCircleIcon className="h-6 w-6 text-rose-600" />,
      notify: <InformationCircleIcon className="h-6 w-6 text-blue-600" />,
    }),
    []
  );

  if (!open) return null;
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4 absolute bottom-0 w-full"
    >
      <div className="flex items-start gap-4">
        {iconMap[type]}
        <div className="flex-1">
          <strong className="block font-medium text-gray-900">{title}</strong>

          {subText && <p className="mt-1 text-sm text-gray-700">{subText}</p>}
        </div>
        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={closePopup}
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

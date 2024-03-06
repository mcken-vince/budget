'use client';

import { ReactElement, useRef, useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { useClickOutside } from '@hooks';

export interface DropdownMenuProps {
  icon?: ReactElement;
  items: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: any;
  }[];
  uniqueId: string;
}

export const DropdownMenu = ({ icon, items, uniqueId }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setOpen(false);
  });
  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <button
          className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          {icon ?? <EllipsisHorizontalIcon className="h-6 w-6 text-current" />}
        </button>
      </div>
      {open && (
        <div
          className="absolute end-0 z-10 mt-2 w-max divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
          onBlur={() => setOpen(false)}
          ref={wrapperRef}
        >
          <div className="p-2 flex flex-col">
            {items?.map((item, idx) => (
              <button
                key={`${uniqueId}-menu-item-${idx}`}
                className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 "
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.onClick) item.onClick();
                  setOpen(false);
                }}
              >
                <a
                  href={item.href}
                  className="w-full inline-flex justify-between gap-3"
                >
                  {item.icon ? <item.icon className="h-4 w-4" /> : ''}
                  {item.label}
                </a>
              </button>
            ))}
          </div>

          {/* <div className="p-2">
            <form method="POST" action="#">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Product
              </button>
            </form>
          </div> */}
        </div>
      )}
    </div>
  );
};

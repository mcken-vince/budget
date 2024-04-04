'use client';

import { XCircleIcon } from '@heroicons/react/16/solid';
import { ReactElement, useEffect, useRef } from 'react';
import { IconButton } from './Buttons/IconButton';
import { Button } from './Buttons/Button';

export interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  disableSubmit?: boolean;
  children: ReactElement;
  closeButtonText?: string;
  submitButtonText?: string;
  preventCloseOnClickOutside?: boolean;
}

export const Modal = ({
  title,
  show,
  onClose,
  onSubmit,
  disableSubmit,
  closeButtonText = 'Cancel',
  submitButtonText = 'Submit',
  children,
  preventCloseOnClickOutside,
}: ModalProps) => {
  const modalIsOpenRef = useRef<boolean>(false);

  useEffect(() => {
    const keyUpEventListener = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && onClose) onClose();
      if (e.code === 'Enter' && onSubmit) onSubmit();
    };
    if (modalIsOpenRef.current) {
      window.addEventListener('keyup', keyUpEventListener);
    }
    return () => window.removeEventListener('keyup', keyUpEventListener);
  }, [onClose, onSubmit]);

  if (!show) {
    modalIsOpenRef.current = false;
    return null;
  } else {
    modalIsOpenRef.current = true;
  }

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-800/50"
      onClick={preventCloseOnClickOutside ? undefined : onClose}
    >
      <div
        className="relative w-auto my-6 mx-auto max-w-3xl min-w-[400px] max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-middle justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-2xl font=semibold">{title}</h3>
            <IconButton onClick={onClose}>
              <XCircleIcon className="h-5 w-5 self-center" />
            </IconButton>
          </div>
          <div className="relative p-6 flex-auto">{children}</div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-2">
            <Button
              variant="border"
              color="secondary"
              onClick={() => onClose()}
            >
              {closeButtonText}
            </Button>
            <Button
              disabled={disableSubmit}
              onClick={async () => {
                if (onSubmit) await onSubmit();
              }}
            >
              {submitButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

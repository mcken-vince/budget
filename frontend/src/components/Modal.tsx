import { XCircleIcon } from '@heroicons/react/16/solid';
import { ReactElement } from 'react';
import { IconButton } from './Buttons/IconButton';

export interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  children: ReactElement;
  closeButtonText?: string;
  preventCloseOnClickOutside?: boolean;
}

export const Modal = ({
  title,
  show,
  onClose,
  onSubmit,
  closeButtonText,
  children,
  preventCloseOnClickOutside,
}: ModalProps) => {
  if (!show) return null;
  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-800/50"
      onClick={preventCloseOnClickOutside ? undefined : onClose}
    >
      <div
        className="relative w-auto my-6 mx-auto max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-middle justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">{title}</h3>
            <IconButton onClick={onClose}>
              <XCircleIcon className="h-5 w-5 self-center" />
            </IconButton>
          </div>
          <div className="relative p-6 flex-auto">{children}</div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => onClose()}
            >
              {closeButtonText ?? 'Close'}
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={async () => {
                if (onSubmit) await onSubmit();
                onClose();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

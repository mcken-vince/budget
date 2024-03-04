import { ReactElement } from 'react';

export interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  children: ReactElement;
  closeButtonText?: string;
}

export const Modal = ({
  title,
  show,
  onClose,
  onSubmit,
  closeButtonText,
  children,
}: ModalProps) => {
  if (!show) return null;
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">{title}</h3>
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

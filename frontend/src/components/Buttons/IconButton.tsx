import { MouseEvent, ReactNode } from 'react';

export interface IconButtonProps {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
};

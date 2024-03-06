'use client';

import { createContext, useContext } from 'react';
import { PopupType } from '@components';

type PopupContextType = OpenPopupProps & {
  open: boolean;
  openPopup: (args: OpenPopupProps) => void;
  closePopup: () => void;
};

export type OpenPopupProps = {
  title: string;
  subText?: string;
  type: PopupType;
};

export const PopupContext = createContext<PopupContextType>({
  open: false,
  openPopup: () => {
    return;
  },
  closePopup: () => {
    return;
  },
  title: '',
  type: 'notify',
});

export function usePopup() {
  return useContext(PopupContext);
}

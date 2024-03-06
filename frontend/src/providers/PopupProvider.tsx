'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Popup } from '@components';
import { OpenPopupProps, PopupContext } from '@hooks';

type PopupProviderProps = {
  children: ReactNode;
};

type PopupStateType = OpenPopupProps & {
  open: boolean;
};

export function PopupProvider({ children }: PopupProviderProps) {
  const [popupState, setPopupState] = useState<PopupStateType>({
    open: false,
    title: '',
    type: 'notify',
  });
  const openPopup = ({ title, subText, type }: OpenPopupProps) =>
    setPopupState({ open: true, title, subText, type });
  const closePopup = () =>
    setPopupState({
      open: false,
      title: '',
      subText: undefined,
      type: 'notify',
    });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (popupState.open) {
      timeout = setTimeout(() => {
        closePopup();
      }, 7000);
    }

    return () => clearTimeout(timeout);
  }, [popupState.open]);

  const value = { ...popupState, openPopup, closePopup };
  return (
    <PopupContext.Provider value={value}>
      {children}
      <Popup
        open={popupState.open}
        type={popupState.type}
        title={popupState.title}
        subText={popupState.subText}
        closePopup={closePopup}
      />
    </PopupContext.Provider>
  );
}

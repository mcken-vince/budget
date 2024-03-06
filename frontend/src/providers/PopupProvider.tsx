'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Popup, PopupType } from '../components/Popup';

type PopupProviderProps = {
  children: ReactNode;
};

type PopupContextType = OpenPopupProps & {
  open: boolean;
  openPopup: (args: OpenPopupProps) => void;
  closePopup: () => void;
};

type OpenPopupProps = {
  title: string;
  subText?: string;
  type: PopupType;
};

type PopupStateType = OpenPopupProps & {
  open: boolean;
};

const PopupContext = createContext<PopupContextType>({
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

export function usePopup() {
  return useContext(PopupContext);
}

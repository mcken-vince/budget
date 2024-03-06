'use client';

import { ReactNode } from 'react';
import AuthContext from './AuthContext';
import { PopupProvider } from './PopupProvider';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthContext>
      <PopupProvider>{children}</PopupProvider>
    </AuthContext>
  );
}

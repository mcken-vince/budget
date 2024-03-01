'use client';

import { ReactNode } from 'react';
import AuthContext from './AuthContext';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <AuthContext>{children}</AuthContext>;
}

'use client';

import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Index Page</h1>
      <h3>Session: {JSON.stringify(session)}</h3>
    </div>
  );
}

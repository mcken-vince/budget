import { UseRedirectIfAuthenticated } from '@hooks';
import { LoginForm } from '@components';

export default function LoginPage() {
  return (
    <>
      <UseRedirectIfAuthenticated />
      <LoginForm />
    </>
  );
}

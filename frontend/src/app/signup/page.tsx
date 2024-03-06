import { UseRedirectIfAuthenticated } from '@hooks';
import { SignUpForm } from '@components';

export default function SignUpPage() {
  return (
    <>
      <UseRedirectIfAuthenticated />
      <SignUpForm />;
    </>
  );
}

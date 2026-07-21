import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <SignIn routing="path" path="/auth/login" signUpUrl="/auth/signup" />
    </div>
  );
}

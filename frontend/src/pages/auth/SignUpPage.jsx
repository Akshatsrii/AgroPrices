import React from 'react';
import { SignUp } from '@clerk/clerk-react';

export function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <SignUp routing="path" path="/auth/signup" signInUrl="/auth/login" />
    </div>
  );
}

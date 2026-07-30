import React from 'react';
import { SignInPage } from './SignInPage';

// For OTP flows, Sign In and Sign Up are exactly the same logic.
// So we just re-export the SignInPage.
export function SignUpPage() {
  return <SignInPage />;
}

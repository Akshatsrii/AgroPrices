import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export function SignInPage() {
  return (
    <div className="w-full flex justify-center">
      <SignIn 
        routing="path" 
        path="/auth/login" 
        signUpUrl="/auth/signup"
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full shadow-2xl rounded-[32px]',
            card: 'w-full bg-white shadow-2xl rounded-[32px] p-6 sm:p-8 border border-gray-100 relative overflow-hidden',
            headerTitle: 'text-2xl sm:text-3xl font-black text-gray-900 tracking-tight text-left pr-8',
            headerSubtitle: 'text-sm text-gray-500 mt-1 font-normal text-left mb-3',
            socialButtonsBlockButton: 'w-full rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 flex items-center justify-center transition-all mb-2',
            dividerLine: 'bg-gray-200',
            dividerText: 'text-gray-400 text-xs font-semibold uppercase bg-white px-2',
            formFieldLabel: 'text-xs font-bold text-gray-700 uppercase tracking-wider mb-1',
            formFieldInput: 'w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all font-medium',
            formButtonPrimary: 'w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer mt-3',
            footerActionText: 'text-sm text-gray-500 font-medium',
            footerActionLink: 'text-emerald-600 hover:text-emerald-700 font-bold ml-1 no-underline',
            footer: 'bg-transparent border-t border-gray-100 pt-3 mt-3',
            identityPreviewText: 'font-semibold text-gray-800',
            identityPreviewEditButton: 'text-emerald-600 hover:text-emerald-700 font-bold text-xs',
          },
          variables: {
            colorPrimary: '#16a34a',
            colorText: '#0f172a',
            borderRadius: '0.75rem',
            fontFamily: 'inherit',
          }
        }}
      />
    </div>
  );
}



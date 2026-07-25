import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ClerkProvider } from '@clerk/clerk-react'

// Import Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function RootApp() {
  if (PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith('pk_')) {
    return (
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
        appearance={{
          variables: {
            colorPrimary: '#16a34a',
            colorText: '#0f172a',
            colorBackground: '#ffffff',
            colorInputBackground: '#f8fafc',
            colorInputText: '#0f172a',
            borderRadius: '0.75rem',
          },
          elements: {
            card: 'shadow-xl border border-gray-100',
            formButtonPrimary: 'bg-green hover:bg-green-dark text-white shadow-md',
            footerActionLink: 'text-green hover:text-green-dark font-bold'
          }
        }}
      >
        <App />
      </ClerkProvider>
    );
  }

  // Safe fallback if Clerk key is invalid or not provided
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)

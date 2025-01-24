'use client'

import { Toaster } from '@/components/ui/toaster';
import { getAuthedUser } from '@/services/auth';
import useAuth from '@/stores/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect } from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const setAuth = useAuth((state) => state.setAuth);

    useEffect(() => {
      getAuthedUser().then((user) => {
        if (!user) return;
        setAuth(user);
      })
    }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster />
      {children}
    </GoogleOAuthProvider>
  )
}

export default Providers
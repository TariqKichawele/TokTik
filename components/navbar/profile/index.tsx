'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { auth } from '@/services/auth';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link'
import React, { useState } from 'react'
import { TbLogout } from 'react-icons/tb';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    console.log('logout');
  }
  
  const onSuccess = async(res: { credential?: string }) => {
    if (!res.credential) return;
    await auth(res.credential);
    setIsLoggedIn(true);
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Link
              href={`/`}
              className="text-neutral-400 font-semibold hover:underline"
            >
              Tariq K
            </Link>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
          </div>
          <button
            onClick={logout}
            className="text-2xl transition-all hover:text-primary"
          >
            <TbLogout />
          </button>
        </div>
      ) : (
        <GoogleLogin 
          onSuccess={res => onSuccess(res)}
          onError={() => console.error("Login Failed")}
        />
      )}
    </>
  )
}

export default Profile
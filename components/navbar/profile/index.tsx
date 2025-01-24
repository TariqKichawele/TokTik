'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/services/auth';
import useAuth from '@/stores/auth';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link'
import React from 'react'
import { TbLogout } from 'react-icons/tb';

const Profile = () => {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setAuth = useAuth((state) => state.setAuth);
  const authedUser = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const { toast } = useToast();
  
  const onSuccess = async(res: { credential?: string }) => {
    if (!res.credential) return;
    const user = await auth(res.credential);
    if (!user) return;
    setAuth(user);
    toast({
      title: "Login Successful",
      description: "You have successfully logged in",
      variant: "default",
    })
  }
  return (
    <>
      {isLoggedIn && authedUser ? (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Link
              href={`/user/${authedUser._id}`}
              className="text-neutral-400 font-semibold hover:underline"
            >
              {authedUser.name}
            </Link>
            <Avatar className="w-8 h-8">
              <AvatarImage src={authedUser.picture_url} />
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
          onError={() => toast({
            title: "Login Failed",
            description: "There was an error logging in",
            variant: "destructive",
          })}
        />
      )}
    </>
  )
}

export default Profile
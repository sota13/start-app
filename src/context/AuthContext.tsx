"use client"

import { absoluteUrl } from '@/lib/utils';
import { UserDetail } from '@/types/userTypes';
import React, { createContext, useContext, useEffect, useState } from 'react';


const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type ContextType = {
  user: UserDetail | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserDetail | null>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<ContextType>(INITIAL_STATE);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(absoluteUrl('/api/users/profile'))
      if (response.ok) {
        const {user:userDetail}:{message:string,user:UserDetail} = await response.json()
        setUser(userDetail);

        console.log(userDetail)

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    

    checkAuthUser();
  }, []);

  const value:ContextType = {
    user,
    setUser,
    isLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
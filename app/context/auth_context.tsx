'use client'
import axios from 'axios'
import React, { createContext, useState } from 'react'







type AuthProviderProps = {
    children: React.ReactNode
}

interface AuthContextType {
    auth: any
    setAuth: React.Dispatch<React.SetStateAction<any>>
    login: () => Promise<void>
    register: (data: { username: string; email: string; password: string }) => Promise<void>
}

interface RegisterType {
    username: string
    email: string
    password: string
}



export const AuthContext = createContext<AuthContextType | null>(null)
export default function AuthContextProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useState(null)





    const login = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                email: 'user@example.com',
                password: 'password123',
            });
            setAuth(response.data);
        } catch (error) {

        }
    }




    const register = async ({ username, email, password }: RegisterType) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/local/register`,
                {
                    username,
                    email,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                    }
                }


            );
            setAuth(response.data);
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
        }
    }


    return (
        <AuthContext.Provider value={{ auth, setAuth, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}

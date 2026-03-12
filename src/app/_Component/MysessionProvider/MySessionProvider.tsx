'use client'

import { CartContextProvider } from '_/app/cart/CartContext'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function MySessionProvider({children}: {children: ReactNode}) {
    return <>
    <SessionProvider>
      <CartContextProvider>

        {children}

      </CartContextProvider>
    </SessionProvider>
    </>
}
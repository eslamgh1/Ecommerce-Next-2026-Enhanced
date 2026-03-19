"use client"; // Required for useState

import Link from 'next/link';
import React, { use, useContext, useEffect, useState } from 'react';
import logo from '@images/shophub-logo.svg';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { getUserCart } from '_/app/_services/cart.services';
// import { CartContext } from '_/app/cart/cartContext';
import { CartContext } from '_/app/cart/CartContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const [initialCartCount , setCartCount] = useState(0);

    const { data: session, status } = useSession();
    const isAuthenticated = !!session;
    const pathname = usePathname();

    const { cartCount, updateCartCount } = useContext(CartContext);

    const handleLogout = () => {
        signOut({redirect: true, callbackUrl: '/login'});
    };

    // get user cart
    useEffect(() => {
        getUserCart().then((res) => {
            setCartCount(res.numOfCartItems);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    
    return (
        <nav className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 fixed w-full z-20 top-0 start-0 border-b border-white/20 backdrop-blur-lg shadow-lg">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <Link href="/" className="flex items-center group">
                    <Image src={logo} alt="Freshcart Logo" priority className="h-8 w-auto filter brightness-0 invert group-hover:scale-105 transition-all duration-300" />
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-white/80 rounded-lg md:hidden hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Nav Links */}
                <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto md:order-2`}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:mt-0 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md md:bg-transparent md:flex-row md:items-center md:space-x-1 lg:space-x-8 md:border-0">

                        {isAuthenticated ? <>
                            <li>
                                <Link href="/" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                    isActiveLink('/') 
                                        ? 'text-white font-semibold md:bg-white/20' 
                                        : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                }`}>Home</Link>
                            </li>
                            <li>
                                <Link href="/categories" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                    isActiveLink('/categories') 
                                        ? 'text-white font-semibold md:bg-white/20' 
                                        : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                }`}>Categories</Link>
                            </li>
                            <li>
                                <Link href="/products" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                    isActiveLink('/products') 
                                        ? 'text-white font-semibold md:bg-white/20' 
                                        : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                }`}>Products</Link>
                            </li>
                            <li>
                                <Link href="/brands" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                    isActiveLink('/brands') 
                                        ? 'text-white font-semibold md:bg-white/20' 
                                        : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                }`}>Brands</Link>
                            </li>
                            <li>
                                <Link href="/cart" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 relative ${
                                    isActiveLink('/cart') 
                                        ? 'text-white font-semibold md:bg-white/20' 
                                        : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                }`}>
                                    Cart
                                    {(cartCount || initialCartCount) > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-linear-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                                            {cartCount || initialCartCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                <Link href="/allorders?default=true" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                    isActiveLink('/allorders') 
                                        ? 'text-white font-semibold md:bg-white/20' 
                                        : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                }`}>All Orders</Link>
                            </li>

                            <li className="border-t border-white/20 md:border-t-0 mt-2 pt-2 md:mt-0 md:pt-0">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 px-3 text-white/90 hover:text-red-300 md:p-2 md:rounded-lg md:hover:bg-red-500/20 md:transition-all duration-300 md:hover:scale-105"
                                >
                                    LogOut
                                </button>
                            </li>

                        </> : status !== "loading" && <>
                            <div className="flex flex-col md:flex-row md:space-x-2 lg:space-x-4 border-t border-white/20 md:border-t-0 mt-2 pt-2 md:mt-0 md:pt-0">
                                <li>
                                    <Link href="/login" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                        isActiveLink('/login') 
                                            ? 'text-white font-semibold md:bg-white/20' 
                                            : 'text-white/90 hover:text-white md:hover:bg-white/20'
                                    }`}>Login</Link>
                                </li>
                                <li>
                                    <Link href="/register" className={`block py-2 px-3 md:p-2 md:rounded-lg md:transition-all duration-300 md:hover:scale-105 ${
                                        isActiveLink('/register') 
                                            ? 'text-white font-semibold md:bg-white/20' 
                                            : 'bg-white text-blue-600 font-semibold hover:bg-blue-50'
                                    }`}>Register</Link>
                                </li>
                            </div>
                        </>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}
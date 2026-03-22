'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "_/components/ui/table";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { getUserCart } from "../_services/cart.services";
import { itemType } from "../_interfaces/itemType";
import RemoveItemButton from "./removeItemButton";
import { ChangeCountBtn } from "./ChangeCountBtn";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartData, setCartData] = useState<{
    numOfCartItems: number;
    products: itemType[];
    totalCartPrice: number;
  }>({
    numOfCartItems: 0,
    products: [],
    totalCartPrice: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const router = useRouter();

  async function fetchCart() {
    try {
      const data = await getUserCart();
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      console.log("Cart update detected, refreshing cart data...");
      fetchCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [fetchCart]);

  useEffect(() => {
    console.log("Cart data updated:", {
      numOfCartItems: cartData.numOfCartItems,
      products: cartData.products.map(p => ({
        id: p._id,
        title: p.product.title,
        count: p.count,
        price: p.price
      })),
      totalCartPrice: cartData.totalCartPrice
    });
  }, [cartData]);

  const { numOfCartItems, products, totalCartPrice } = cartData;

  const handleProceedToPayment = () => {
    setIsPaymentLoading(true);
    // Simulate navigation delay or add any pre-payment logic here
    setTimeout(() => {
      router.push('/cart/payment');
    }, 500);
  };

  // For now, make inputs read-only since this is a server component
  // TODO: Convert to client component for full interactivity

  return (
    <div className="p-30">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-0 mb-8 lg:mb-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shopping Cart</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-blue-700 font-medium">Items: <span className="font-bold text-blue-800">{numOfCartItems}</span></span>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-700 font-medium">Total: <span className="font-bold text-green-800">{totalCartPrice} EGP</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 lg:mt-0">
          <Button 
            onClick={handleProceedToPayment}
            disabled={isPaymentLoading}
            className="cursor-pointer w-full lg:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isPaymentLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceed to Payment
              </div>
            )}
          </Button>
          {/* <Button className="cursor-pointer" variant="destructive">Clear Cart</Button> */}
        </div>
      </div>

      <div className="w-full lg:w-3/4 mx-auto">
        <div className="block lg:hidden">
          {/* Mobile View - Column Layout */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Your shopping cart items</h3>
            {products.map((item: itemType) => (
              <div key={item._id} className="border rounded-lg p-4 space-y-3">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-600">
                      {item.product.title.split(' ').slice(0, 2).join(' ')}
                    </h4>
                    <p className="text-lg font-semibold text-green-600">{item.price} EGP</p>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Qty:</span>
                    <div className="flex items-center gap-0 bg-gray-100 rounded-lg p-1 flex-1 min-w-0">
                      <ChangeCountBtn isIncrement={true} id={item.product.id} newCount={item.count + 1} />
                      <div className="w-12 text-center font-semibold text-gray-800 shrink-0">
                        {item.count}
                      </div>
                      <ChangeCountBtn id={item.product.id} newCount={item.count - 1} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Updated: {item.count}</span>
                    <RemoveItemButton id={item.product.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          {/* Desktop View - Table Layout */}
          <Table>
            <TableCaption>Your shopping cart items</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 text-blue-600 text-center">Product</TableHead>
                <TableHead className="text-blue-600 text-center">Price</TableHead>
                <TableHead className="text-blue-600 text-center">Count</TableHead>
                <TableHead className="text-center text-blue-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-center">
              {products.map((item: itemType) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-green-600">
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        <img src={item.product.imageCover} alt={item.product.title} className="max-w-[100px] max-h-[100px]" />
                      </div>
                      <h3 className="text-sm">
                        {item.product.title.split(' ').slice(0, 2).join(' ')}
                      </h3>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-600">{item.price}</TableCell>
                  <TableCell className="text-green-600">{item.count}</TableCell>
                  <TableCell className="text-green-600 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        {/* <Button className="cursor-pointer" size="sm">+</Button> */}
                        <ChangeCountBtn isIncrement={true} id={item.product.id} newCount={item.count + 1} />

                        <Input
                          type="number"
                          value={item.count}
                          className="w-16 text-center"
                          readOnly
                        />
                        {/* <Button className="cursor-pointer" size="sm">-</Button> */}
                        <ChangeCountBtn id={item.product.id} newCount={item.count - 1} />

                      </div>
                      <div>
                        {/* <Button variant="destructive" className="cursor-pointer w-full" size="sm">Remove</Button> */}
                        <RemoveItemButton id={item.product.id} />

                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
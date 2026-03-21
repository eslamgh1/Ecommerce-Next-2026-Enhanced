'use client'

import { Button } from "_/components/ui/button";
import { useContext, useState } from "react";
import { CartContext } from "_/app/cart/CartContext";
import { addProductToCart } from "_/app/cart/cart.action";
import { toast } from "sonner";

export default function AddProductBtn({id}:{id:string}) {

    const {updateCartCount} = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)

    async function handleAddToCart() {
        console.log("Add to Cart clicked for product:", id);
        
        // Prevent multiple clicks while loading
        if (isLoading) return;
        
        setIsLoading(true);
        
        try {
            const isSuccessfullyAdd = await addProductToCart(id); // server action ==> cart.action

            if (isSuccessfullyAdd) {
                console.log("Product added to cart successfully, new count:", isSuccessfullyAdd);
                updateCartCount(isSuccessfullyAdd)
                
                // Trigger cart refresh after successful addition
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                }
                
                toast.success("Product added to cart!");
            } else {
                console.error("Failed to add product to cart");
                toast.error("Failed to add product to cart. Please try again.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("An error occurred. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    }



    return (<>
        {/* Quick Add Button - Now part of the flex column */}
        <div className="p-4 pt-0">
            <Button 
                onClick={handleAddToCart} 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                    </div>
                ) : (
                    "Add to Cart"
                )}
            </Button>
        </div>
    </>)
}
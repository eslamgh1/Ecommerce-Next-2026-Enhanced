'use client'
import { Button } from "_/components/ui/button"
import { removeItemFromCart } from "./cart.action"
import { useContext, useState } from "react"
import { CartContext } from "_/app/cart/CartContext"

export default function RemoveItemButton({id}: {id: string}) {

    const {updateCartCount} = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)

    async function handleRemoveItem(){
        
        // Prevent multiple clicks while loading
        if (isLoading) return;
        
        setIsLoading(true);
        
        try {
            const output = await removeItemFromCart(id)
            if(output === null){
                console.error("Failed to remove item from cart")
            }else{
                console.log("Item removed from cart")
                updateCartCount(output)
                
                // Trigger cart refresh after successful removal
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                }
            }
        } catch (error) {
            console.error("Error removing item:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button 
            onClick={handleRemoveItem} 
            variant="destructive" 
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
            size="sm"
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                "Remove"
            )}
        </Button>
    )
}
"use client"
import { Button } from "_/components/ui/button";
import { changeCount } from "./cart.action";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export function ChangeCountBtn({ isIncrement = false, id, newCount }: { isIncrement?: boolean, id: string, newCount: number }) {

    const { updateCartCount } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)

    // calling Api
    async function handleChangeCount() {

        // Prevent multiple clicks while loading
        if (isLoading) return;

        setIsLoading(true);

        try {
            const output = await changeCount(id, newCount)

            console.log(output);

            if (output === null) {
                // Use a different approach to avoid the toast error
                console.error("Count Not Changed, try again");
            } else {
                console.log(`Count Changed to ${newCount}`);
                updateCartCount(output)
                
                // Trigger cart refresh after successful change
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cartUpdated'));
                }
            }
        } catch (error) {
            console.error("Error changing count:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Button
                disabled={newCount === 0 || isLoading}
                onClick={handleChangeCount}
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
                size="sm"
            >
                {isLoading ? (
                    <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <span className="text-green-600 font-semibold text-lg">{isIncrement ? '+' : '-'}</span>
                )}
            </Button>
        </div>
    )
}
"use client"
import { Button } from "_/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "_/components/ui/card";
import { Input } from "_/components/ui/input";
import { Label } from "_/components/ui/label";
import { createCashOrder, makeCheckoutSession } from "./order.action";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserCart } from "_/app/_services/cart.services";
import { toast } from "sonner";
import { CartContext } from "../CartContext";


export default function Payment() {

    const {updateCartCount} = useContext(CartContext)
    // we use useRef to get the value of the input
    const cityRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const detailsRef = useRef<HTMLInputElement>(null)
// we use useState to get the cartId
    const [cartId, setCartId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCardPaymentLoading, setIsCardPaymentLoading] = useState(false)
    const [isCashPaymentLoading, setIsCashPaymentLoading] = useState(false)

    // we use useEffect to get the cartId
    async function handleGetingUserCart() {
        try {
            const res = await getUserCart()
            console.log("Cart response:", res)
            if (res.cartId) {
                setCartId(res.cartId)
            } else {
                console.error("No cart ID found in response")
            }
        } catch (error) {
            console.error("Failed to get user cart:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetingUserCart()
    }, [])

// we use async function to make the order
    async function makeCashOrder() {
        
        const address = {
            city: cityRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            details: detailsRef.current?.value || ""
        }

        if (!cartId) {
            console.error("No cart ID available")
            return
        }

        setIsCashPaymentLoading(true)
        try {
            // call Api // server action
            const result = await createCashOrder(cartId, address)
            console.log("Cash order created successfully:", result)
            if(result && typeof result === 'string'){
                toast.success("Order created successfully")
                updateCartCount(0)
                // Redirect to orders page
                window.location.href = result
            } else {
                console.error("Failed to create cash order:", result)
                toast.error("Failed to create order")
            }

        } catch (error) {
            console.error("Failed to create order:", error)
            toast.error("Failed to create order")
        } finally {
            setIsCashPaymentLoading(false)
        }
    }

// we use async function to make the order
    async function makeCardOrder() {
        
        const address = {
            city: cityRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            details: detailsRef.current?.value || ""
        }

        if (!cartId) {
            console.error("No cart ID available")
            return
        }

        setIsCardPaymentLoading(true)
        try {
            // call Api // server action
            const result = await makeCheckoutSession(cartId, address)
            console.log("Checkout session created successfully:", result)
            if(result && typeof result === 'string'){
                toast.success("Checkout session created successfully")
                // updateCartCount(0)
                // window.open(result, "_self")
                window.location.href = result
            } else {
                console.error("Failed to create checkout session:", result)
                toast.error("Failed to create checkout session")
            }

        } catch (error) {
            console.error("Failed to Checkout session:", error)
            toast.error("Failed to Checkout session")
        } finally {
            setIsCardPaymentLoading(false)
        }
    }

    return (
        <>
            <Card className="w-full max-w-2xl mx-auto mt-30">
                <CardHeader>
                    <CardTitle>Proceed to Payment</CardTitle>
                    <CardDescription>
                        Fill the form below to proceed to payment
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="city">city</Label>
                                <Input ref={cityRef} id="city" type="text" required placeholder="Enter your city" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">phone</Label>
                                <Input ref={phoneRef} id="phone" type="text" required placeholder="Enter your phone" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="details">details</Label>
                                <Input
                                    ref={detailsRef}
                                    id="details"
                                    type="text"
                                    placeholder="details"
                                    required
                                />
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button 
                        onClick={makeCardOrder} 
                        type="submit" 
                        className="w-full" 
                        disabled={isCardPaymentLoading || isLoading || !cartId}
                    >
                        {isCardPaymentLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : (
                            "Make Card payment"
                        )}
                    </Button>
                    <Button 
                        onClick={makeCashOrder} 
                        variant="outline" 
                        className="w-full"
                        disabled={isCashPaymentLoading || isLoading || !cartId}
                    >
                        {isCashPaymentLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : !cartId ? "No cart available" : "Make cash payment"}
                    </Button>
                </CardFooter>
            </Card>
        </>


    )
}
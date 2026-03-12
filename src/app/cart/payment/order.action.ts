'use server'
import { getUserToken } from "_/app/utils/utils"
import { revalidatePath } from "next/cache";

type shippingAddressType = {
    city: string;
    phone: string;
    details: string;
}

export async function createCashOrder(cartId:string , shippingAddress: shippingAddressType) {

    const token = await getUserToken()
    
    if (!token) {
        console.error("No authentication token available")
        return { statusMsg: 'fail', message: 'Authentication required' }
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress}),
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            // cache: "force-cache"
        })

        const finalCreateOrder = await response.json()
        console.log("Raw cash order API response:", finalCreateOrder)
        if(finalCreateOrder.status==="success"){
            revalidatePath("/cart")
            return "/allorders"  // Redirect to orders page after successful cash order
        } else {
            console.error("API returned non-success status:", finalCreateOrder)
            return { statusMsg: 'fail', message: 'Failed to create cash order', data: finalCreateOrder }
        }
        
        // return finalCreateOrder
    } catch (error) {
        console.error("Error creating order:", error)
        return { statusMsg: 'fail', message: 'Failed to create order' }
    }
}

export async function makeCheckoutSession(cartId:string , shippingAddress: shippingAddressType) {

    const token = await getUserToken()
    
    if (!token) {
        console.error("No authentication token available")
        return { statusMsg: 'fail', message: 'Authentication required' }
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress}), // stringfy the shippingAddress  to convert the shippingAddress to a string
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            // cache: "force-cache"
        })

        console.log("Response status:", response.status)
        
        const finalCardOrder = await response.json()
        console.log("Raw API response:", finalCardOrder)
        console.log("Response session.url field:", finalCardOrder.session?.url)
        
        if(finalCardOrder.status==="success" && finalCardOrder.session?.url){
            console.log("Returning URL:", finalCardOrder.session.url)
            return finalCardOrder.session.url
        } else {
            console.error("API returned non-success status or missing URL:", finalCardOrder)
            return { statusMsg: 'fail', message: 'Failed to create checkout session', data: finalCardOrder }
        }
        
        // return finalCreateOrder
    } catch (error) {
        console.error("Error creating order:", error)
        return { statusMsg: 'fail', message: 'Failed to create checkout session' }
    }
    
  
}
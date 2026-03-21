'use server'
import { getUserToken } from "../utils/utils";
import { getUserCartType } from "../_interfaces/cartTypes";

export async function getUserCart() : Promise<getUserCartType>{
    const token = await getUserToken();

    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            }
        })

        const finalRes = await response.json()
        console.log({ "Cart API Response": finalRes, "Status": response.status, "OK": response.ok });

        // Handle various error scenarios
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            return {
                numOfCartItems: 0,
                products: [],
                totalCartPrice: 0,
                cartId: ""
            };
        }

        // Check if response is empty or malformed
        if (!finalRes || Object.keys(finalRes).length === 0) {
            console.error('Empty or malformed API response:', finalRes);
            return {
                numOfCartItems: 0,
                products: [],
                totalCartPrice: 0,
                cartId: ""
            };
        }

        // Handle specific error responses
        if (finalRes?.statusMsg === 'error' || finalRes?.statusMsg === 'fail') {
            console.error('Cart API Error:', finalRes);
            return {
                numOfCartItems: 0,
                products: [],
                totalCartPrice: 0,
                cartId: ""
            };
        }

        // Success case
        console.log("API Response structure:", {
            hasData: !!finalRes.data,
            topLevelKeys: Object.keys(finalRes),
            dataKeys: finalRes.data ? Object.keys(finalRes.data) : [],
            productsArray: finalRes.data?.products || [],
            allProducts: finalRes.products || [],
            finalResProducts: finalRes.products || finalRes.data?.products || []
        })

        // Try multiple possible locations for products data
        const products = finalRes.data?.products || 
                        finalRes.products || 
                        finalRes.products || 
                        [];

        return {
            numOfCartItems: finalRes.numOfCartItems ?? 0,
            products: products,
            totalCartPrice: finalRes.data?.totalCartPrice ?? finalRes.totalCartPrice ?? 0,
            cartId: finalRes.data?.cartId ?? finalRes.cartId ?? finalRes._id ?? ""
        };

    } catch (error) {
        console.error('Cart Service Error:', error);
        return {
            numOfCartItems: 0,
            products: [],
            totalCartPrice: 0,
            cartId: ""
        };
    }
}
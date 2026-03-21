'use server'
import { getUserToken } from "../utils/utils";

// Order types based on the API response
export type OrderItemType = {
    _id: string;
    count: number;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        category: {
            _id: string;
            name: string;
            slug: string;
            image: string;
        };
        brand: {
            _id: string;
            name: string;
            slug: string;
            image: string;
        };
        ratingsAverage: number;
        id: string;
    };
    price: number;
};

export type ShippingAddressType = {
    details: string;
    phone: string;
    city: string;
};

export type UserType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
};

export type OrderType = {
    _id: string;
    shippingAddress?: ShippingAddressType;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: 'cash' | 'card';
    isPaid: boolean;
    isDelivered: boolean;
    user: UserType;
    cartItems: OrderItemType[];
    createdAt: string;
    updatedAt: string;
    id: number;
    paidAt?: string;
};

export type OrdersResponseType = {
    status: string;
    data: OrderType[];
};

// Get all orders for logged-in user
export async function getAllUserOrders(): Promise<OrderType[] | null> {
    const token = await getUserToken();

    try {
        // First get user data to extract userId from token
        const userResponse = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            }
        });

        if (!userResponse.ok) {
            console.error('Failed to verify user token');
            return null;
        }

        const userData = await userResponse.json();
        const userId = userData?.user?._id || userData?.user?.id;

        if (!userId) {
            console.error('Could not extract user ID from token');
            return null;
        }

        // Now fetch orders for specific user
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            }
        });

        const finalRes = await response.json();
        console.log({ "Orders API Response": finalRes, "Status": response.status, "OK": response.ok });

        // Handle various error scenarios
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            return null;
        }

        // Check if response is empty or malformed
        if (!finalRes || Object.keys(finalRes).length === 0) {
            console.error('Empty or malformed API response:', finalRes);
            return null;
        }

        // Handle specific error responses
        if (finalRes?.statusMsg === 'error' || finalRes?.statusMsg === 'fail') {
            console.error('Orders API Error:', finalRes);
            return null;
        }

        // Success case - return the orders array
        console.log("Orders API Response structure:", {
            hasData: !!finalRes.data,
            isArray: Array.isArray(finalRes.data),
            dataLength: finalRes.data?.length || 0
        });

        return finalRes.data || [];

    } catch (error) {
        console.error('Orders Service Error:', error);
        return null;
    }
}

// Get a specific order by ID
export async function getOrderById(orderId: string): Promise<OrderType | null> {
    const token = await getUserToken();

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            }
        });

        const finalRes = await response.json();
        console.log({ "Order API Response": finalRes, "Status": response.status, "OK": response.ok });

        // Handle various error scenarios
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            return null;
        }

        // Check if response is empty or malformed
        if (!finalRes || Object.keys(finalRes).length === 0) {
            console.error('Empty or malformed API response:', finalRes);
            return null;
        }

        // Handle specific error responses
        if (finalRes?.statusMsg === 'error' || finalRes?.statusMsg === 'fail') {
            console.error('Order API Error:', finalRes);
            return null;
        }

        // Success case - return the order data
        console.log("Order API Response structure:", {
            hasData: !!finalRes.data,
            dataKeys: finalRes.data ? Object.keys(finalRes.data) : []
        });

        return finalRes.data || null;

    } catch (error) {
        console.error('Order Service Error:', error);
        return null;
    }
}
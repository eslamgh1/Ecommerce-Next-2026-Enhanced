'use server'
import { toast } from "sonner";
import { getUserToken } from "../utils/utils";
import { revalidatePath } from "next/cache";
import { count } from "console";

// I Can use Axio "library-outside"
export  async function addProductToCart(productId: string) {
    console.log("Add to Cart clicked");

    const token = await getUserToken()
    console.log({ token });

    if (token) {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            cache: "force-cache"
        })
        const finalRes = await response.json()
  

        if(finalRes.status === "success") {
            revalidatePath("/cart")
            return finalRes.numOfCartItems
        }else{
            return false
        }
    }

}


export  async function removeItemFromCart(id: string) {
    console.log("Remove to Cart clicked");

    const token = await getUserToken()

    if (token) {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            method: "DELETE",

            headers: {
                token: token as string
            },
            // cache: "force-cache"
        })
        const finalResDelete = await response.json()
  
        console.log({finalResDelete});
        // revalidatePath for update
        if(finalResDelete.status == 'success'){
            revalidatePath("/cart")

            return finalResDelete.numOfCartItems
        }else{
            return null
        }

    }

}


export  async function changeCount(id: string , count:number) {

    const token = await getUserToken()

    if (token) {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            method: "PUT",
            body: JSON.stringify({ count }),
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            // cache: "force-cache"
        })
        const finalResUpdate = await response.json()
  
        console.log({finalResUpdate});
        // revalidatePath for update
        if(finalResUpdate.status == 'success'){
            revalidatePath("/cart")

            return finalResUpdate.numOfCartItems
        }else{
            return null
        }

    }

}
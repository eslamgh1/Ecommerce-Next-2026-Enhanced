import { getUserToken } from '../utils/utils'

// export async function clearUserCart() {
//     const token = await getUserToken()

//     if (token) {
//         const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 token: token as string
//             },
//             // cache: "force-cache"
//         })
//         const clearUserCartRes = await response.json()
  
//         console.log({clearUserCartRes});
//         // revalidatePath for update
//         if(clearUserCartRes.status == 'success'){
//             // revalidatePath("/cart")

//             return true
//         }else{
//             return false
//         }
//     }
//  }
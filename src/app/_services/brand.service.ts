import { BrandType } from "../_interfaces/products"

export async function getAllBrands() : Promise<null | BrandType[]> {

    try {
        
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
        const finalRes = await res.json()
        console.log("getAllBrands", finalRes.data)
        return finalRes.data
        
    } catch (error) {
        
        // console.log("errorGetAllBrands", error)
        return null
    }
}
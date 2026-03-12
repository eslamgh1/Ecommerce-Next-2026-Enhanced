import { cookies } from "next/headers";
import { ProductType } from "../_interfaces/products";

  // return ProductType[] 
  export async function getAllProducts(): Promise<ProductType[] | null> {
    try {

      // const cookie = await cookies()
      // const token = cookie.get("user-token")
      // console.log({ token })

      // await == pause the execution until the promise is resolved
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/products" , {cache: "force-cache"});
      //pause the execution until the promise is resolved
      const finalRes = await res.json();

      return finalRes.data; // to use the data in other functions

    } catch (error) {
      console.log({ error });
      return null;
    }
  }

// return ProductType only one product
  export async function getSpecificProduct(id: string): Promise<ProductType | null> {
    try {
      
      // await == pause the execution until the promise is resolved
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      //pause the execution until the promise is resolved
      const finalRes = await res.json();

      return finalRes.data; // to use the data in other functions

    } catch (error) {
      console.log({ error });
      return null;
    }
  }
import { itemType } from "./itemType"



export type getUserCartType ={
    numOfCartItems: number, 
    products: itemType[],
    totalCartPrice:number,
    cartId:string

}

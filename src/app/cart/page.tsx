
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "_/components/ui/table";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { getUserCart } from "../_services/cart.services";
import { itemType } from "../_interfaces/itemType";
import RemoveItemButton from "./removeItemButton";
import { ChangeCountBtn } from "./ChangeCountBtn";
import Link from "next/link";

export default async function CartPage() {

  // await getUserCart()

  const { numOfCartItems, products, totalCartPrice } = await getUserCart()
  console.log({ "products": products });

  // For now, make inputs read-only since this is a server component
  // TODO: Convert to client component for full interactivity

  return (
    <div className="p-30">
      <div className="w-full flex justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <div className="text-lg">Number of items: {numOfCartItems}</div>
          <div className="text-lg font-semibold">Total price: {totalCartPrice} EGP</div>
        </div>
        <div className="flex gap-2">
          <Link href='/cart/payment'>          <Button className="cursor-pointer">Proceed to Payment</Button></Link>
          <Button className="cursor-pointer" variant="destructive">Clear Cart</Button>
        </div>
      </div>

      <div className="w-full lg:w-3/4 mx-auto">
        <div className="block lg:hidden">
          {/* Mobile View - Column Layout */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Your shopping cart items</h3>
            {products.map((item: itemType) => (
              <div key={item._id} className="border rounded-lg p-4 space-y-3">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-600">
                      {item.product.title.split(' ').slice(0, 2).join(' ')}
                    </h4>
                    <p className="text-lg font-semibold text-green-600">{item.price} EGP</p>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Qty:</span>
                    <div className="flex gap-2 items-center">
                      {/* <Button className="cursor-pointer" size="sm">+</Button> */}
                      <ChangeCountBtn isIncrement={true} id={item.product.id} newCount={item.count + 1} />
                      <Input
                        type="number"
                        value={item.count} //item.count = The Current reality (what is in the database right now).
                        className="w-16 text-center"
                        readOnly
                      />
                      <ChangeCountBtn id={item.product.id} newCount={item.count - 1} />
                      {/* 
                      <Button className="cursor-pointer" size="sm">-</Button> */}
                    </div>
                  </div>
                  {/* <Button variant="destructive" className="cursor-pointer" size="sm">Remove</Button> */}
                  <RemoveItemButton id={item.product.id} />

                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          {/* Desktop View - Table Layout */}
          <Table>
            <TableCaption>Your shopping cart items</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 text-blue-600 text-center">Product</TableHead>
                <TableHead className="text-blue-600 text-center">Price</TableHead>
                <TableHead className="text-blue-600 text-center">Count</TableHead>
                <TableHead className="text-center text-blue-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-center">
              {products.map((item: itemType) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-green-600">
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        <img src={item.product.imageCover} alt={item.product.title} className="max-w-[100px] max-h-[100px]" />
                      </div>
                      <h3 className="text-sm">
                        {item.product.title.split(' ').slice(0, 2).join(' ')}
                      </h3>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-600">{item.price}</TableCell>
                  <TableCell className="text-green-600">{item.count}</TableCell>
                  <TableCell className="text-green-600 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        {/* <Button className="cursor-pointer" size="sm">+</Button> */}
                        <ChangeCountBtn isIncrement={true} id={item.product.id} newCount={item.count + 1} />

                        <Input
                          type="number"
                          value={item.count}
                          className="w-16 text-center"
                          readOnly
                        />
                        {/* <Button className="cursor-pointer" size="sm">-</Button> */}
                        <ChangeCountBtn id={item.product.id} newCount={item.count - 1} />

                      </div>
                      <div>
                        {/* <Button variant="destructive" className="cursor-pointer w-full" size="sm">Remove</Button> */}
                        <RemoveItemButton id={item.product.id} />

                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
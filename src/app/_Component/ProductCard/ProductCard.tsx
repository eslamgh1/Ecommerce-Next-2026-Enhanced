import { ProductType } from "_/app/_interfaces/products";
import React from "react";
import { ProductTypeCard } from "./ProductCard.type";
import Link from "next/link";
import AddProductBtn from "../AddProductBtn/AddProductBtn";


export default async function ProductCard({ product }: ProductTypeCard) {

  return (
    <div className="group h-full flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/productDetails/${product.id}`} className="flex flex-col h-full">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          {product.priceAfterDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 flex flex-col grow">
          <h2 className="text-gray-800 font-semibold text-sm sm:text-base h-12 sm:h-10 line-clamp-2 mb-2">
            {product.title}
          </h2>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-xs text-red-400 line-through">{product.price} EGP</span>
                  <span className="text-blue-600 font-bold text-sm sm:text-base">{product.priceAfterDiscount} EGP</span>
                </>
              ) : (
                <span className="text-gray-900 font-bold text-sm sm:text-base">{product.price} EGP</span>
              )}
            </div>

            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-xs font-medium">
              <span className="text-gray-700">{product.ratingsAverage}</span>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-3 sm:p-4 pt-0">
        <AddProductBtn id={product.id}/>
      </div>
    </div>
  )
}

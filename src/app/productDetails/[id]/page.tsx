import AddProductBtn from "_/app/_Component/AddProductBtn/AddProductBtn";
import { getSpecificProduct } from "_/app/_services/products.service";
import { Button } from "_/components/ui/button";
import React from "react";

type ProductDetailsPropsType = {
    params: Promise<{id: string}>;
};

export default async function ProductDetails({params} : ProductDetailsPropsType) {

    const {id} = await params;
    const object = await getSpecificProduct(id);

    if (!object){
        return;
    }
    
   return (
        <div className="min-h-screen w-full md:w-3/4 mx-auto flex flex-col md:grid md:grid-cols-4 items-center gap-10 p-6">         
            {/* Image Section */}
            <div className="col-span-1 w-full">
                <img 
                    src={object?.imageCover} 
                    alt={object?.title} 
                    className="w-full rounded-xl shadow-lg object-cover"
                />
            </div>

            {/* Details Section */}
            <div className="col-span-3 flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-gray-800">{object?.title}</h1>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                    {object?.description}
                </p>

                <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Price</span>
          
                    <div className="text-2xl font-bold text-blue-600">
                        {object?.priceAfterDiscount ? (
                            <div className="flex items-center gap-3">
                                <span className="line-through text-gray-400 text-lg">{object?.price} EGP</span>
                                <span>{object?.priceAfterDiscount} EGP</span>
                            </div>
                        ) : (
                            <span>{object?.price} EGP</span>
                        )}
                    </div>
                              <span className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Category {object?.category.name}</span>
                    <span className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Brand {object?.brand.name}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 w-fit px-3 py-1 rounded-full">
                    <span className="font-bold">{object?.ratingsAverage}</span>
                    <i className="fa-solid fa-star text-yellow-500"></i>
                </div>

                {/* <button className="mt-6 w-full md:w-max bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    Add to Cart
                </button> */}
                {/* // send productId to AddProduct */}
                <AddProductBtn id={object?.id}/>
                <h1>Button test</h1>
            </div>

        </div>  
    );
}   
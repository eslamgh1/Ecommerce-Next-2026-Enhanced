import React, { lazy, Suspense } from "react";

//slider images
import img1 from "@images/slider-image-1.jpeg";
import img2 from "@images/slider-image-2.jpeg";
import img3 from "@images/slider-image-3.jpeg";
//blog images
import blog1 from "@images/blog-img-1.jpeg";
import blog2 from "@images/blog-img-2.jpeg";
import HomeSlider from "../_Component/HomeSlider/HomeSlider";
import Loader from "../_Component/Loader/Loader";
import { getAllProducts } from "../_services/products.service";
import ProductCard from "../_Component/ProductCard/ProductCard";

// import CategoriesSlider from "./_Component/CategoriesSlider/CategoriesSlider";


const CategoriesSlider = lazy(() => import('../_Component/CategoriesSlider/CategoriesSlider'))
//Home function is a Server Component.
// It’s just a "Regular" Async Function
//One-Time Run: It doesn't "re-render" every time something changes like a client component; it runs once per request (unless you use caching).
export default async function Home() {
  //1- fetch the products from the API
  const allProducts = await getAllProducts()

  // const res = await fetch('http://localhost:3000/api/myUsers')
  // const users = await res.json()
  // // console.log({users})


  return (
    <>
      {/* Hero Section with Enhanced Mobile Design */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6 bg-linear-to-br from-gray-50 to-gray-100">
        {/* Full-width slider section */}
        <div className="w-full mb-6 lg:mb-8">
          <HomeSlider />
        </div>

        {/* Blog Images Section - Side by side with better layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
          <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <img className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500" src={blog1.src} alt="blog1" />
          </div>
          <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <img className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500" src={blog2.src} alt="blog2" />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <Suspense fallback={<div><Loader /></div>}>
          <CategoriesSlider />
        </Suspense>
      </div>
    
      {/* Products Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
            Featured Products
          </h2>
          <p className="text-gray-600 text-center mt-2 text-sm sm:text-base">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {allProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
import { getAllCategories } from "../_services/categories.service"
import Image from "next/image"
import Link from "next/link"


const allCategories = await getAllCategories()
console.log("allCategories", allCategories)

export default function Categories() {
    return (
        <div className="py-32 min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Shop by <span className="text-transparent bg-clip-text bg-linear-to-br from-blue-600 to-purple-600">Categories</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our wide range of products organized by categories. Find exactly what you're looking for with ease.
                    </p>
                </div>

                {/* Categories Grid */}
                {allCategories && allCategories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allCategories.map((category) => (
                            <Link 
                                key={category.id} 
                                href="/"
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                {/* Category Image */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-br from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                
                                {/* Category Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 capitalize">
                                            {category.slug}
                                        </span>
                                        <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                            <span className="text-sm font-medium mr-1">Explore</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-600 rounded-2xl transition-colors duration-300 pointer-events-none" />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Categories Found</h3>
                        <p className="text-gray-500">Check back later for new categories and products.</p>
                    </div>
                )}

                {/* Stats Section */}
                {allCategories && allCategories.length > 0 && (
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900">{allCategories.length}</h4>
                            <p className="text-gray-600">Categories Available</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900">1000+</h4>
                            <p className="text-gray-600">Products</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900">Best Prices</h4>
                            <p className="text-gray-600">Guaranteed</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
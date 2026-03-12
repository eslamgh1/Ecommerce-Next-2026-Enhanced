'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllBrands } from '../_services/brand.service'
import { BrandType } from '../_interfaces/products'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

export default function Brands() {
  const [brands, setBrands] = useState<BrandType[]>([])
  const [filteredBrands, setFilteredBrands] = useState<BrandType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrands()
        if (data) {
          setBrands(data)
          setFilteredBrands(data)
        }
      } catch (error) {
        console.error('Failed to fetch brands:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBrands(filtered)
    } else {
      setFilteredBrands(brands)
    }
  }, [searchTerm, brands])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading brands...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
              <p className="text-gray-600 mt-1">Shop by your favorite brands</p>
            </div>
            <div className="text-sm text-gray-500">
              {filteredBrands.length} of {brands.length} brands
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Brands
            </label>
            <Input
              type="text"
              placeholder="Search by brand name..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏷️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredBrands.map((brand) => (
              <Link 
                key={brand.id} 
                href="/"
                className="group"
              >
                <Card className="group-hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border-gray-200 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-center font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-center text-sm text-gray-500 mt-1">
                      {brand.slug}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
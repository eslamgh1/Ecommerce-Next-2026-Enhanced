'use client'

import { useEffect, useState } from 'react'
import { getAllUserOrders, OrderType } from '../_services/getOrder.service'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { revalidatePath } from "next/cache"

export default function AllOrders() {
    const [orders, setOrders] = useState<OrderType[]>([])
    const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'delivered' | 'cancelled'>('all')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllUserOrders()
                if (data) {
                    setOrders(data)
                    setFilteredOrders(data)
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    useEffect(() => {
        let filtered = orders

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.id.toString().includes(searchTerm.toLowerCase()) ||
                order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.cartItems.some(item =>
                    item.product.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => {
                if (statusFilter === 'pending') return !order.isPaid
                if (statusFilter === 'paid') return order.isPaid && !order.isDelivered
                if (statusFilter === 'delivered') return order.isDelivered
                return true
            })
        }

        setFilteredOrders(filtered)
    }, [searchTerm, statusFilter, orders])

    const getStatusBadge = (order: OrderType) => {
        if (order.isDelivered) {
            return <Badge className="bg-green-500 text-white">Delivered</Badge>
        } else if (order.isPaid) {
            return <Badge className="bg-blue-500 text-white">Paid</Badge>
        } else {
            return <Badge className="bg-yellow-500 text-white">Pending</Badge>
        }
    }

    const getPaymentMethodBadge = (method: string) => {
        return method === 'cash' 
            ? <Badge variant="secondary">Cash</Badge>
            : <Badge variant="secondary">Card</Badge>
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your orders...</p>
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
                            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-gray-600 mt-1">Track and manage your orders</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {filteredOrders.length} of {orders.length} orders
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Orders
                            </label>
                            <Input
                                type="text"
                                placeholder="Search by order ID, name, or product..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status Filter
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as 'all' | 'pending' | 'paid' | 'delivered' | 'cancelled')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Orders</option>
                                <option value="pending">Pending Payment</option>
                                <option value="paid">Paid (Processing)</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setSearchTerm('')
                                    setStatusFilter('all')
                                }}
                                className="w-full"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📦</div>
                        <h3 className="font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-600">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'You haven\'t placed any orders yet'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <Card key={order._id} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                            {getStatusBadge(order)}
                                            {getPaymentMethodBadge(order.paymentMethodType)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(order.createdAt)}
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <CardContent>
                                    {/* Order Summary */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                                            <div className="space-y-1 text-sm">
                                                <p><span className="font-medium">Name:</span> {order.user.name}</p>
                                                <p><span className="font-medium">Email:</span> {order.user.email}</p>
                                                <p><span className="font-medium">Phone:</span> {order.user.phone}</p>
                                                {order.shippingAddress && (
                                                    <>
                                                        <p><span className="font-medium">Shipping:</span> {order.shippingAddress.city}</p>
                                                        <p><span className="font-medium">Address:</span> {order.shippingAddress.details}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                                            <div className="space-y-1 text-sm">
                                                <p><span className="font-medium">Items:</span> {order.cartItems.length} products</p>
                                                <p><span className="font-medium">Subtotal:</span> ${order.totalOrderPrice}</p>
                                                <p><span className="font-medium">Shipping:</span> ${order.shippingPrice}</p>
                                                <p><span className="font-medium">Tax:</span> ${order.taxPrice}</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    <span className="font-medium">Total:</span> ${order.totalOrderPrice + order.shippingPrice + order.taxPrice}
                                                </p>
                                                {order.paidAt && (
                                                    <p><span className="font-medium">Paid on:</span> {formatDate(order.paidAt)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {order.cartItems.map((item) => (
                                                <div key={item._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <img
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-gray-900 truncate">
                                                            {item.product.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.product.brand.name} • {item.product.category.name}
                                                        </p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <span className="text-sm font-medium">
                                                                Qty: {item.count}
                                                            </span>
                                                            <span className="text-sm font-bold text-gray-900">
                                                                ${item.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Track Order
                                        </Button>
                                        {!order.isDelivered && (
                                            <Button variant="outline" size="sm">
                                                Contact Support
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
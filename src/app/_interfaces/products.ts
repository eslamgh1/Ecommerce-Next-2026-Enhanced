export type ProductType = {
    id: string,
    title: string,
    imageCover: string,
    description: string,
    category: CategoryType,
    brand: BrandType,
    price: number,
    ratingsAverage: number,
    priceAfterDiscount?: number,
}

export type CategoryType = {
    id: string,
    name: string,
    slug: string,
    image: string,
}
export type BrandType = {
    id: string,
    name: string,
    slug: string,
    image: string,
}
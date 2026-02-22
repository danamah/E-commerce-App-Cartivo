import { ProductsI } from "./products"

export type CartItemType = {
        id: string
        title: string
        category: string
        image: string
        price: number
        quantity: number
    }

export interface CartI {
  status: string
  numOfCartItems: number
  cartId: string
  data: CartDataInterface
}

export interface CartDataInterface {
  _id: string
  cartOwner: string
  products: CartProductI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProductI{
  count: number
    _id: string
    product: ProductsI
    price: number
}


export interface Product2 {
  subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

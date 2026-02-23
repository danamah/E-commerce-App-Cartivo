// src/types/order.ts

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderProduct {
  count: number;
  price: number;
  _id: string;
  product: {
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  };
}

export interface Order {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderProduct[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
export enum OrderStatus {
  pending = 'pending',
  delivered = 'delivered',
  cancelled = 'cancelled',
  processing = 'processing',
  shipping = 'shipping'
}
export type Order = {
  id: number
  userId: number
  fullName: string
  phoneNumber: string
  shippingAddress: string
  note: string | null
  totalMoney: number
  totalPayment: number
  discount: number
  orderDate: string
  status: OrderStatus
  paymentMethod: string
  shippingMethod: string
  shippingMoney: number
  shippingDate: string
  trackingNumber: string
  orderDetails: OrderDetail[]
}

export type OrderDetail = {
  id: number
  birdId: number
  birdName: string
  thumbnail: string
  gender: string
  price: number
  numberOfProducts: number
}

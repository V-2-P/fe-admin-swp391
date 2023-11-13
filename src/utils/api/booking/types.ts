import { BirdDetail } from '~/application/components/birdList/birdDetail'

export enum BookingStatus {
  pending = 'Pending',
  confirmed = 'Confirmed',
  preparing = 'Preparing',
  shipping = 'Shipping',
  delivered = 'Delivered',
  cancelled = 'Cancelled'
}

export interface User {
  createdAt: string
  updatedAt: string
  id: number
  fullName: string
  phoneNumber: string
  email: string
  address: string
  imageUrl: string
  roleEntity: {
    id: number
    name: string
  }
  emailVerified: boolean
  dob: string
  isActive: number
}

export interface BookingDetail {
  createdAt: string
  updatedAt: string
  id: number
  booking: string
  birdType: {
    id: number
    name: string
  }
  fatherBird: {
    createdAt: string
    updatedAt: string
    id: number
    name: string
    price: number
    thumbnail: string
    description: string
    category: {
      id: number
      name: string
    }
    birdType: {
      id: number
      name: string
    }
    status: boolean
    purebredLevel: string
    competitionAchievements: number
    age: string
    gender: string
    color: string
    quantity: number
    birdImages: {
      id: number
      imageUrl: string
    }[]
  }
  motherBird: {
    createdAt: string
    updatedAt: string
    id: number
    name: string
    price: number
    thumbnail: string
    description: string
    category: {
      id: number
      name: string
    }
    birdType: {
      id: number
      name: string
    }
    status: boolean
    purebredLevel: string
    competitionAchievements: number
    age: string
    gender: string
    color: string
    quantity: number
    birdImages: {
      id: number
      imageUrl: string
    }[]
  }
  status: string
  birdPairing: BirdPairing[]
}

export interface BirdPairing {
  createdAt: string
  updatedAt: string
  id: number
  newBird: BirdDetail
  status: string
}

export interface Booking {
  createdAt: string
  updatedAt: string
  id: number
  user: User
  fullName: string
  bookingTime: string
  phoneNumber: string
  shippingAddress: string
  paymentMethod: string
  manager: User
  status: string
  paymentDeposit: number
  totalPayment: number
  bookingDetail: BookingDetail
}

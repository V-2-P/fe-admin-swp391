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

export interface Bird {
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
  birdImages: string[] // Replace with the actual type if birdImages have specific structure
}

export interface BirdPairing {
  createdAt: string
  updatedAt: string
  id: number
  newBird: Bird
  status: string
}

export interface BookingDetail {
  createdAt: string
  updatedAt: string
  id: number
  birdType: {
    id: number
    name: string
  }
  fatherBird: Bird
  motherBird: Bird
  status: string
  birdPairing: BirdPairing[]
}

export interface Booking {
  createdAt: string
  updatedAt: string
  id: number
  user: User
  fullName: string
  bookingTime: string | null
  phoneNumber: string
  shippingAddress: string
  paymentMethod: string
  manager: any // Replace with the actual type if manager has specific structure
  status: string
  paymentDeposit: any // Replace with the actual type if paymentDeposit has specific structure
  totalPayment: any // Replace with the actual type if totalPayment has specific structure
  bookingDetail: BookingDetail
}

export interface FeedbackBooking {
  createdAt: string
  updatedAt: string
  id: number
  booking: Booking
  rating: number
  comment: string
  isActive: number
}

import { Dayjs } from 'dayjs'

export type User = {
  id?: number
  fullName?: string
  phoneNumber?: string
  email?: string
  address?: string
  imageUrl?: string
  roleEntity?: {
    id: number
    name: string
  }
  emailVerified?: boolean
  dob?: string
  isActive?: number
  createdAt?: Date
  updatedAt?: Date
}

export type Users = {
  user: User
  orderQuantity: number
  bookingQuantity: number
  totalMoney: number
}

export type UpdateProfilePayload = {
  fullName?: string
  email?: string
  phoneNumber?: string
  address?: string
  dob?: string | Dayjs
  currentPassword?: string
  password?: string
  confirmedPassword?: string
}

export type AddUserPayload = {
  fullName?: string
  email?: string
  phoneNumber?: string
  dob?: Dayjs | string
  address?: string
  roleId?: string
  password?: string
}

export type UpdateUserPayload = {
  fullName?: string
  phoneNumber?: string
  address?: string
  email?: string
  facebook?: string
  google?: string
  isActive?: string
}

export const ROLE = {
  ADMIN: 1,
  MANAGER: 2,
  STAFF: 3,
  CUSTOMER: 4
}

export enum Role {
  ROLE_ADMIN,
  ROLE_MANAGER,
  ROLE_STAFF,
  ROLE_CUSTOMER
}

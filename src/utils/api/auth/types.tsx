import { Role } from '../user/types'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  refreshToken: string
  accessToken: string
  userId: number
  role: Role
  imageUrl: string
}

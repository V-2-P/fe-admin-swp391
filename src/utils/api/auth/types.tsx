export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  refreshToken: string
  accessToken: string
  userId: number
  role: string
  imageUrl: string
}

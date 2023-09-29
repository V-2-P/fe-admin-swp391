import { RcFile } from 'antd/es/upload'

export type AddBirdFieldType = {
  name?: string
  category?: string
  age?: number
  gender?: string
  price?: number
  quantity?: number
  description?: string
  images?: RcFile[]
  thumbnail?: RcFile
  puredLevel?: string
  competitionAchievements?: number
  color?: string
  birdType?: string
}

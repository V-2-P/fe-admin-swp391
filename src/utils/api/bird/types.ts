import { UploadFile } from 'antd/es/upload'

export type AddBirdPayload = {
  name?: string
  price?: number
  description?: string
  categoryId?: number
  typeId?: number
  status?: boolean
  purebredLevel?: string
  competitionAchievements?: number
  age?: string
  quantity?: number
  gender?: string
  color?: string
  imageThumbnail?: UploadFile
  imagesFile?: UploadFile[]
}

export type UpdateBirdPayload = {
  name?: string
  price?: number
  description?: string
  categoryId?: number
  typeId?: number
  status?: boolean
  thumbnail?: string
  purebredLevel?: string
  competitionAchievements?: string
  age?: string
  quantity?: string
  gender?: string
  color?: string
}

export type BirdImage = {
  files?: string[]
}

export type BirdImageList = {
  id: number
  imageUrl: string
}

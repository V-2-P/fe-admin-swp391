import { RcFile } from 'antd/es/upload'

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
  imageThumbnail?: RcFile
  imagesFile?: RcFile[]
}

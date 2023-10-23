import axiosClient from '../AxiosClient'
import { AddBirdTypePayload } from './types'

const APIs_URL = {
  BIRD_TYPE: '/birdtype',
  DELETE_BIRD_TYPE: (id: number) => `/birdtype/${id}`
}

export const addBirdTypeAPI = async (data: AddBirdTypePayload) => {
  return await axiosClient.post(APIs_URL.BIRD_TYPE, data)
}

export const deleteBirdTypeAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.DELETE_BIRD_TYPE(id))
}

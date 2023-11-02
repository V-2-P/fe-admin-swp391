import { convertToFormData } from '~/utils/formDataUtils'
import axiosClient from '../AxiosClient'
import { UpdateBirdPayload } from './types'

const APIs_URL = {
  BIRD: '/birds',
  DELETE_BIRD: (id: number) => `/birds/${id}`,
  BIRD_DETAIL: (id: number) => `/birds/detail/${id}`,
  UPDATE_BIRD: (id: number) => `/birds/${id}`
}

export const addBirdAPI = async (data: any) => {
  return await axiosClient.post(APIs_URL.BIRD, convertToFormData(data), {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

export const deleteBirdAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.DELETE_BIRD(id))
}

export const getBirdByIdAPI = async (id: number) => {
  return await axiosClient.get(APIs_URL.BIRD_DETAIL(id))
}

export const updateBirdAPI = async (id: number, data: UpdateBirdPayload) => {
  return await axiosClient.put(APIs_URL.UPDATE_BIRD(id), data)
}

import axiosClient from '../AxiosClient'
import { AddBirdPayload, UpdateBirdPayload } from './types'

const APIs_URL = {
  BIRD: '/birds',
  DELETE_BIRD: (id: number) => `/birds/${id}`,
  BIRD_DETAIL: (id: number) => `/birds/detail/${id}`,
  UPDATE_BIRD: (id: number) => `/birds/${id}`
}

export const addBirdAPI = async (data: AddBirdPayload) => {
  const formData = new FormData()
  for (const [key, value] of Object.entries(data)) {
    formData.append(`${key}`, `${value}`)
  }

  return await axiosClient.post(APIs_URL.BIRD, formData, {
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

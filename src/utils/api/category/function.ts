import axiosClient from '../axiosClient'
import { AddCategoryPayload } from './types'

const APIs_URL = {
  CATEGORY: '/category',
  DELETE_CATEGORY: (id: number) => `/category/${id}`
}

export const addCategoryAPI = async (data: AddCategoryPayload) => {
  return await axiosClient.post(APIs_URL.CATEGORY, data)
}

export const deleteCategoryAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.DELETE_CATEGORY(id))
}

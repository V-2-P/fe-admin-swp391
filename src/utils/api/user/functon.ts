import axiosClient from '../AxiosClient'
import { AddUserPayload } from './types'

const APIs_URL = {
  USER: '/users',
  DELETE_USER: (id: number) => `/users/${id}`
}

export const addUserAPI = async (data: AddUserPayload) => {
  return await axiosClient.post(APIs_URL.USER, data)
}

export const deleteUserAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.DELETE_USER(id))
}

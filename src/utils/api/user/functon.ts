import { convertToFormData } from '~/utils/formDataUtils'
import axiosClient from '../AxiosClient'
import { AddUserPayload, UpdateProfilePayload, UpdateUserPayload } from './types'

const APIs_URL = {
  USER: '/users',
  USER_ID: (id: number) => `/users/${id}`,
  SEARCH_USER: (search: string) => `/users?keyword=${search}&limit=999`,
  DELETE_USER: (id: number) => `/users/${id}`,
  UPLOAD_AVATAR: '/user/uploadavatar',
  PROFILE: '/user/me',
  UPDATE_PROFILE: '/user'
}

export const addUserAPI = async (data: AddUserPayload) => {
  return await axiosClient.post(APIs_URL.USER, data)
}

export const searchUserAPI = async (search: string) => {
  return await axiosClient.get(APIs_URL.SEARCH_USER(search))
}

export const getUserByIdAPI = async (id: number) => {
  return await axiosClient.get(APIs_URL.USER_ID(id))
}

export const uploadAvatarAPI = async (data: any) => {
  return await axiosClient.post(APIs_URL.UPLOAD_AVATAR, convertToFormData(data), {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

export const updateProfileAPI = async (data: UpdateProfilePayload) => {
  return await axiosClient.put(APIs_URL.UPDATE_PROFILE, data)
}

export const getProfileAPI = async () => {
  return await axiosClient.get(APIs_URL.PROFILE)
}

export const updateUserAPI = async (id: number, data: UpdateUserPayload) => {
  return await axiosClient.put(APIs_URL.USER_ID(id), data)
}

export const deleteUserAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.DELETE_USER(id))
}

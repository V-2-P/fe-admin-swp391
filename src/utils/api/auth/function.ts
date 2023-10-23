import axiosClient from '../AxiosClient'
import { LoginPayload } from './types'

const APIs_URL = {
  LOGIN: '/auth/signin'
}

export const loginAPI = async (data: LoginPayload) => {
  return await axiosClient.post(APIs_URL.LOGIN, data)
}

import axiosClient from '../AxiosClient'
import { AddBirdPayload } from './types'

const APIs_URL = {
  BIRD: '/bird'
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

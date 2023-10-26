import axiosClient from '../AxiosClient'

const APIs_URL = {
  USER: '/users',
  DELETE_USER: (id: number) => `/users/${id}`
}

export const deleteUserAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.DELETE_USER(id))
}

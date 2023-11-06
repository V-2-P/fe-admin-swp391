import axiosClient from '../AxiosClient'

const APIs_URL = {
  BOOKING: '/booking',
  BOOKING_ID: (id: number) => `/booking/${id}`,
  BOOKING_STATUS: (status: string) => `/booking?status=${status}`,
  BOOKING_UPDATE_STATUS: (id: number, status: string) => `/booking/${id}/${status}`
}

export const getBookingByIdAPI = async (id: number) => {
  return await axiosClient.get(APIs_URL.BOOKING_ID(id))
}

export const getBookingByStatusAPI = async (status: string) => {
  return await axiosClient.get(APIs_URL.BOOKING_STATUS(status))
}

export const updateBookingStatusAPI = async (id: number, status: string) => {
  return await axiosClient.put(APIs_URL.BOOKING_UPDATE_STATUS(id, status))
}

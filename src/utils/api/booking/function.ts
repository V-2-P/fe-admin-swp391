import axiosClient from '../axiosClient'

const APIs_URL = {
  BOOKING: '/booking',
  BOOKING_ID: (id: number) => `/booking/${id}`,
  BOOKING_STATUS: (status: string) => `/booking?status=${status}`,
  BOOKING_UPDATE_STATUS: (id: number, status: string) => `/booking/${id}/status?status=${status}`,
  BOOKING_USERID: (id: number) => `booking/users/${id}`,
  ADD_BIRDPAIRING: `birdparing?bookingDetailId`,
  UPDATE_TRACKING_NUMBER: (id: number) => `booking/${id}`,
  UPDATE_STATUS_BIRDPAIRING: (id: number, status: string) => `birdparing/${id}/status?status=${status}`,
  UPDATE_STATUS_BOOKING_DETAIL: (id: number, status: string) => `/bookingdetail/${id}/status?status=${status}`
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

export const getBookingByUserIdAPI = async (id: number) => {
  return await axiosClient.get(APIs_URL.BOOKING_USERID(id))
}

export const postBirdPairing = async (id: { bookingDetailId: number }) => {
  return await axiosClient.post(APIs_URL.ADD_BIRDPAIRING, id)
}

export const updateTrackingNumberAPI = async (id: number, tracking: string) => {
  return await axiosClient.put(APIs_URL.UPDATE_TRACKING_NUMBER(id), tracking)
}

export const updateStatusPairingAPI = async (id: number, status: string) => {
  return await axiosClient.put(APIs_URL.UPDATE_STATUS_BIRDPAIRING(id, status))
}

export const updateStatusBookingDeatailAPI = async (id: number, status: string) => {
  return await axiosClient.put(APIs_URL.UPDATE_STATUS_BOOKING_DETAIL(id, status))
}

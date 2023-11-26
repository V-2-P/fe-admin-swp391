import axiosClient from '../axiosClient'

const APIs_URL = {
  FEEDBACK_DETAIL: (id: any) => `/feedbackbirds/${id}`,
  FEEDBACK_HIDDEN: (id: any) => `feedbackbirds/hidden/${id}`,
  FEEDBACK_BOOKING_DETAIL: (id: number) => `feedbackbooking/${id}`,
  FEEDBACK_BOOKING_HIDDEN: (id: number) => `feedbackbooking/${id}`
}

export const getFeedbackById = async (id: any) => {
  return await axiosClient.get(APIs_URL.FEEDBACK_DETAIL(id))
}

export const hiddenFeedbackByIdAPI = async (id: any) => {
  return await axiosClient.put(APIs_URL.FEEDBACK_HIDDEN(id))
}

export const getFeedbacBookingkByIdAPI = async (id: any) => {
  return await axiosClient.get(APIs_URL.FEEDBACK_BOOKING_DETAIL(id))
}

export const hiddenFeedbackBookingAPI = async (id: any) => {
  return await axiosClient.delete(APIs_URL.FEEDBACK_BOOKING_HIDDEN(id))
}

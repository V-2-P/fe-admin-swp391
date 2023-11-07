import axiosClient from '../AxiosClient'

const APIs_URL = {
  FEEDBACK_DETAIL: (id: any) => `/feedbackbirds/${id}`,
  FEEDBACK_HIDDEN: (id: any) => `feedbackbirds/hidden/${id}`
}

export const getFeedbackById = async (id: any) => {
  return await axiosClient.get(APIs_URL.FEEDBACK_DETAIL(id))
}

export const hiddenFeedbackByIdAPI = async (id: any) => {
  return await axiosClient.put(APIs_URL.FEEDBACK_HIDDEN(id))
}

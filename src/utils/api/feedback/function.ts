import axiosClient from '../AxiosClient'

const APIs_URL = {
  FEEDBACK_DETAIL: (id: any) => `/feedbackbirds/${id}`
}

export const getFeedbackById = async (id: any) => {
  return await axiosClient.get(APIs_URL.FEEDBACK_DETAIL(id))
}

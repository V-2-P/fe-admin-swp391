import axiosClient from '../axiosClient'

const APIs_URL = {
  REVENUE: (search: 'daily' | 'month') => `/dashboards/revenue?search=${search}`
}

export const getRevenueAPI = async (search: 'daily' | 'month') => {
  return await axiosClient.get(APIs_URL.REVENUE(search))
}

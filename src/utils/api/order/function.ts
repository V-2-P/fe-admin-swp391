import axiosClient from '../AxiosClient'

const APIs_URL = {
  ORDER: '/orders',
  ORDER_STATUS: (status: string) => `/orders?status=${status}`,
  ORDER_ID: (id: number) => `/orders/${id}`,
  ORDER_PROCESS: (id: number) => `/orders/confirm/${id}`,
  ORDER_SHIPPING: (id: number) => `/orders/shipping/${id}`,
  ORDER_USERID: (id: number) => `/orders/user/${id}`
}

export const getOrderByIdAPI = async (id: number) => {
  return await axiosClient.get(APIs_URL.ORDER_ID(id))
}

export const getOrderByStatusAPI = async (status: string) => {
  return await axiosClient.get(APIs_URL.ORDER_STATUS(status))
}

export const updateOrderProcessingStatusAPI = async (id: number) => {
  return await axiosClient.put(APIs_URL.ORDER_PROCESS(id))
}

export const updateOrderShippingStatusAPI = async (id: number, data: { trackingNumber?: string }) => {
  return await axiosClient.put(APIs_URL.ORDER_SHIPPING(id), data)
}

export const getOrderByUserId = async (id: number) => {
  return await axiosClient.get(APIs_URL.ORDER_USERID(id))
}

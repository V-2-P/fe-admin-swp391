import axiosClient from '../axiosClient'

const APIs_URL = {
  ORDER: '/orders',
  ORDER_STATUS: (status: string) => `/orders?status=${status}`,
  ORDER_ID: (id: number) => `/orders/${id}`,
  ORDER_PROCESS: (id: number) => `/orders/confirm/${id}`,
  ORDER_DELIVERED: (id: number) => `/orders/delivered/${id}`,
  ORDER_CANCELLED: (id: number) => `/orders/cancelled/${id}`,
  ORDER_SHIPPING: `/shipments/create-order`,
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

export const updateOrderShippingStatusAPI = async (data: { id: number; strategyType: 'ORDER' | 'BOOKING' }) => {
  return await axiosClient.post(APIs_URL.ORDER_SHIPPING, data)
}

export const updateOrderDeliveredStatusAPI = async (id: number) => {
  return await axiosClient.put(APIs_URL.ORDER_DELIVERED(id))
}

export const updateOrderCancelledStatusAPI = async (id: number) => {
  return await axiosClient.put(APIs_URL.ORDER_CANCELLED(id))
}

export const getOrderByUserId = async (id: number) => {
  return await axiosClient.get(APIs_URL.ORDER_USERID(id))
}

import axiosClient from '../axiosClient'
const APIs_URL = {
  SHIPMENT: '/shippingmethod',
  SHIPMENT_ID: (id: number) => `/shippingmethod/${id}`
}

export const addShipmentAPI = async (data: { name: string; shippingMoney: number }) => {
  return await axiosClient.post(APIs_URL.SHIPMENT, data)
}

export const deleteShipmentAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.SHIPMENT_ID(id))
}

export const updateShipmentAPI = async (id: number, data: { name: string; shippingMoney: number }) => {
  return await axiosClient.put(APIs_URL.SHIPMENT_ID(id), data)
}

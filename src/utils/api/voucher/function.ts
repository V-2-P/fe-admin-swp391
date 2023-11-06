import { VoucherPayload } from '.'
import axiosClient from '../AxiosClient'

const APIs_URL = {
  VOUCHER: '/voucher',
  VOUCHER_ID: (id: number) => `/voucher/${id}`
}

export const updateVoucherAPI = async (id: number, data: VoucherPayload) => {
  return await axiosClient.put(APIs_URL.VOUCHER_ID(id), data)
}

export const deleteVoucherAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.VOUCHER_ID(id))
}

export const addVoucherAPI = async (data: VoucherPayload) => {
  return await axiosClient.post(APIs_URL.VOUCHER, data)
}

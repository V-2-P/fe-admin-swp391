import { UpdateVoucherPayload } from '.'
import axiosClient from '../AxiosClient'

const APIs_URL = {
  VOUCHER: '/voucher',
  VOUCHER_ID: (id: number) => `/voucher/${id}`
}

export const updateVoucherAPI = async (id: number, data: UpdateVoucherPayload) => {
  return await axiosClient.put(APIs_URL.VOUCHER_ID(id), data)
}

export const deleteVoucherAPI = async (id: number) => {
  return await axiosClient.delete(APIs_URL.VOUCHER_ID(id))
}

import { Dayjs } from 'dayjs'
export type AddUserPayload = {
  fullName?: string
  email?: string
  phoneNumber?: string
  dob?: Dayjs | string
  address?: string
  roleId?: string
  password?: string
}

export const ROLE = {
  ADMIN: 1,
  MANAGER: 2,
  STAFF: 3,
  CUSTOMER: 4
}

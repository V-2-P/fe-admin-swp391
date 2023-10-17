import { ReactNode } from 'react'

export type UpdateStaffFieldType = {
  inputCustomerId?: { value: string; label: ReactNode }
  customerId?: string
  customer?: string
  phone?: string
  address?: string
  email?: string
  facebook?: string
  google?: string
}

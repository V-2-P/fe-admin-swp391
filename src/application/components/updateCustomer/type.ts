import { ReactNode } from 'react'

export type UpdateCustomerFieldType = {
  inputCustomerId?: { value: string; label: ReactNode }
  customerId?: string
  customer?: string
  phone?: string
  address?: string
  email?: string
  facebook?: string
  google?: string
}

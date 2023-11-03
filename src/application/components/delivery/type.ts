import { ReactNode } from 'react'
export type DeliveryFieldType = {
  orderId?: string[]
  deliveryBy?: string
  trackingId?: string
  inputOrderId?: { value: string; label: ReactNode }
}

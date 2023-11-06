import { OrderStatus } from './api'
import { BookingStatus } from './api/booking'

export const getOrderStatus = (status: OrderStatus | string): { name: string; color: string } => {
  let result
  switch (status) {
    case OrderStatus.pending || OrderStatus.pending.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'orange'
      }
      break
    case OrderStatus.delivered || OrderStatus.delivered.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'success'
      }
      break
    case OrderStatus.cancelled || OrderStatus.cancelled.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'red'
      }
      break
    case OrderStatus.processing || OrderStatus.processing.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'processing'
      }
      break
    case OrderStatus.shipping || OrderStatus.shipping.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'purple'
      }
      break
    default:
      result = {
        name: 'UNKNOWN',
        color: 'magenta'
      }
  }

  return result
}

export const getBookingStatus = (status: BookingStatus | string): { name: string; color: string } => {
  let result
  switch (status) {
    case BookingStatus.cancelled || BookingStatus.cancelled.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'red'
      }
      break
    case BookingStatus.confirmed || BookingStatus.confirmed.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'success'
      }
      break
    case BookingStatus.delivered || BookingStatus.delivered.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'success'
      }
      break
    case BookingStatus.pending || BookingStatus.pending.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'orange'
      }
      break
    case BookingStatus.preparing || BookingStatus.preparing.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'processing'
      }
      break
    case BookingStatus.shipping || BookingStatus.shipping.toString():
      result = {
        name: status.toString().toUpperCase(),
        color: 'purple'
      }
      break
    default:
      result = {
        name: 'UNKNOWN',
        color: 'magenta'
      }
  }
  return result
}

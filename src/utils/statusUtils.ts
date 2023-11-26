import { OrderStatus } from './api'
import { BookingStatus } from './api/booking'

export const getOrderStatus = (status: OrderStatus | string): { name: string; color: string } => {
  let result
  switch (status) {
    case OrderStatus.pending || OrderStatus.pending.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Chờ xác nhận',
        color: 'orange'
      }
      break
    case OrderStatus.delivered || OrderStatus.delivered.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Hoàn thành',
        color: 'success'
      }
      break
    case OrderStatus.cancelled || OrderStatus.cancelled.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Hủy',
        color: 'red'
      }
      break
    case OrderStatus.processing || OrderStatus.processing.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Xử lý',
        color: 'processing'
      }
      break
    case OrderStatus.shipping || OrderStatus.shipping.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Giao hàng',
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
        // name: status.toString().toUpperCase(),
        name: 'Hủy',
        color: 'red'
      }
      break
    case BookingStatus.confirmed || BookingStatus.confirmed.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Lai chim',
        color: 'processing'
      }
      break
    case BookingStatus.delivered || BookingStatus.delivered.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Hoàn thành',
        color: 'success'
      }
      break
    case BookingStatus.pending || BookingStatus.pending.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Chờ thanh toán',
        color: 'orange'
      }
      break
    case BookingStatus.preparing || BookingStatus.preparing.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Nhận con',
        color: 'cyan'
      }
      break
    case BookingStatus.shipping || BookingStatus.shipping.toString():
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Giao hàng',
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

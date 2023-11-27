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

export const getBookingStatus = (
  status: BookingStatus | string,
  status2nd?: string
): { name: string; color: string } => {
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
        name: 'Đã đặt cọc',
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
      if (status2nd === 'Fledgling_All') {
        result = {
          // name: status.toString().toUpperCase(),
          name: 'Chờ nhận con',
          color: 'cyan'
        }
        break
      }
      if (status2nd === 'Receiving_Confirm') {
        result = {
          // name: status.toString().toUpperCase(),
          name: 'Nhận con',
          color: 'cyan'
        }
        break
      }
      if (status2nd === 'Not_Receiving_Confirm') {
        result = {
          // name: status.toString().toUpperCase(),
          name: 'Không nhận con',
          color: 'cyan'
        }
        break
      }
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
export const getBookingDetailStatus = (status: string): { name: string; color: string } => {
  let result
  switch (status) {
    case 'Waiting':
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Đã đặt cọc',
        color: 'processing'
      }
      break
    case 'In_Breeding_Progress':
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Nhân giống',
        color: 'processing'
      }
      break
    case 'Brooding':
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Ấp trứng',
        color: 'success'
      }
      break
    case 'Fledgling_All':
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Trứng nở hết',
        color: 'orange'
      }
      break
    case 'Cancelled':
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Hủy',
        color: 'red'
      }
      break
    case 'Preparing':
      result = {
        // name: status.toString().toUpperCase(),
        name: 'Nhận con',
        color: 'cyan'
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

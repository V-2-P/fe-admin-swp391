import { OrderStatus } from './api'

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

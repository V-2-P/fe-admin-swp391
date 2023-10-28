export const getStatusInfo = (status: string): { name: string; color: string } => {
  let result
  switch (status.toUpperCase()) {
    case 'pending':
      result = {
        name: status.toUpperCase(),
        color: 'cyan'
      }
      break
    case 'processing':
      result = {
        name: status.toUpperCase(),
        color: 'cyan'
      }
      break
    case 'shipping':
      result = {
        name: status.toUpperCase(),
        color: 'gold'
      }
      break
    case 'delivered':
      result = {
        name: status.toUpperCase(),
        color: 'green'
      }
      break
    case 'cancelled':
      result = {
        name: status.toUpperCase(),
        color: 'volcano'
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

export const getOrderStatus = (status: string): { name: string; color: string } => {
  let result
  switch (status) {
    case 'pending':
      result = {
        name: status.toUpperCase(),
        color: 'processing'
      }
      break
    case 'delivered':
      result = {
        name: status.toUpperCase(),
        color: 'success'
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

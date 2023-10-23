export const getStatusInfo = (status: string): { name: string; color: string } => {
  let result
  switch (status.toUpperCase()) {
    case 'PROCESS':
      result = {
        name: status.toUpperCase(),
        color: 'cyan'
      }
      break
    case 'SHIPPING':
      result = {
        name: status.toUpperCase(),
        color: 'gold'
      }
      break
    case 'COMPLETE':
      result = {
        name: status.toUpperCase(),
        color: 'green'
      }
      break
    case 'CANCELLED':
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

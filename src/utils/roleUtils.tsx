export const getRoleColor = (role?: string): { name: string; color: string } => {
  let result
  switch (role?.toUpperCase()) {
    case 'STAFF':
      result = {
        name: role.toUpperCase(),
        color: 'cyan'
      }
      break
    case 'CUSTOMER':
      result = {
        name: role.toUpperCase(),
        color: 'cyan'
      }
      break
    case 'ADMIN':
      result = {
        name: role.toUpperCase(),
        color: 'gold'
      }
      break
    case 'MANAGER':
      result = {
        name: role.toUpperCase(),
        color: 'green'
      }
      break
    case 'cancelled':
      result = {
        name: role.toUpperCase(),
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

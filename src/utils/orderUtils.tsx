import type { StepProps } from 'antd'
export const getOrderStepTitle = (status: string, item: StepProps): StepProps => {
  switch (status) {
    case 'pending':
      return {
        ...item,
        title: item.title?.toString().replace('Đã', 'Chờ')
      }
    case 'processing':
      return {
        ...item,
        title: item.title?.toString().replace('Chờ', 'Đã')
      }
    case 'shipping':
      return {
        ...item,
        title: item.title?.toString().replace('Chờ', 'Đã')
      }
    case 'delivered':
      return {
        ...item,
        title: item.title?.toString().replace('Chờ', 'Đã')
      }
    case 'cancelled':
      return {
        title: item.title
      }
  }
  return item
}

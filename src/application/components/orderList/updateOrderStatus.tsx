import React, { useState } from 'react'
import { OrderStatus, updateOrderProcessingStatusAPI } from '~/utils/api'
import { getOrderStatus } from '~/utils/statusUtils'
import { Dropdown, Tag, App, Spin } from 'antd'
import { reFetchData } from '~/redux/slices'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { Link } from 'react-router-dom'
type UpdateOrderStatusProps = {
  status: OrderStatus | string
  id: number
}
const options = [
  // { value: OrderStatus.pending },
  { value: OrderStatus.processing }
  // { value: OrderStatus.shipping },
  // { value: OrderStatus.delivered },
  // { value: OrderStatus.cancelled }
]

const UpdateOrderStatus: React.FC<UpdateOrderStatusProps> = ({ status, id }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | string>(status)
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()

  const items = options.map((option) => ({
    label: (
      <Tag bordered={false} color={getOrderStatus(option.value).color}>
        {getOrderStatus(option.value).name}
      </Tag>
    ),
    key: option.value
  }))
  const handleChangeStatus = async (e: any) => {
    setLoading(true)

    try {
      const response = await updateOrderProcessingStatusAPI(id)
      setLoading(false)
      if (response) {
        notification.success({ message: `Cập nhật trạng thái thành công` })
        setCurrentStatus(e.key)
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  if (currentStatus === OrderStatus.pending) {
    return (
      <Spin spinning={loading}>
        <Dropdown
          menu={{ items, onClick: handleChangeStatus }}
          trigger={['click']}
          placement='bottomRight'
          className='cursor-pointer'
        >
          <Tag bordered={false} color={getOrderStatus(currentStatus).color}>
            {getOrderStatus(currentStatus).name}
          </Tag>
        </Dropdown>
      </Spin>
    )
  }
  if (currentStatus === OrderStatus.processing || currentStatus === OrderStatus.shipping) {
    return (
      <Link to={`/delivery/${id}`}>
        <Tag bordered={false} color={getOrderStatus(currentStatus).color}>
          {getOrderStatus(currentStatus).name}
        </Tag>
      </Link>
    )
  }
  return (
    <Tag bordered={false} color={getOrderStatus(currentStatus).color}>
      {getOrderStatus(currentStatus).name}
    </Tag>
  )
}

export default UpdateOrderStatus

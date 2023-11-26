import React, { useState } from 'react'
import {
  OrderStatus,
  updateOrderDeliveredStatusAPI,
  updateOrderProcessingStatusAPI,
  updateOrderShippingStatusAPI
} from '~/utils/api'
import { getOrderStatus } from '~/utils/statusUtils'
import { Dropdown, Tag, App, Spin } from 'antd'
import { reFetchData } from '~/redux/slices'
import { useAppDispatch } from '~/application/hooks/reduxHook'

type UpdateOrderStatusProps = {
  status: OrderStatus | string
  id: number
}

const UpdateOrderStatus: React.FC<UpdateOrderStatusProps> = ({ status, id }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const options = [
    { value: OrderStatus.pending },
    { value: OrderStatus.processing },
    { value: OrderStatus.shipping },
    { value: OrderStatus.delivered },
    { value: OrderStatus.cancelled }
  ]
  const items = options
    .filter((options) => {
      if (options.value === status) {
        return false
      }
      if (
        status === OrderStatus.pending &&
        (options.value === OrderStatus.shipping || options.value === OrderStatus.delivered)
      ) {
        return false
      }
      if (
        status === OrderStatus.processing &&
        (options.value === OrderStatus.pending || options.value === OrderStatus.delivered)
      ) {
        return false
      }
      if (
        status === OrderStatus.shipping &&
        (options.value === OrderStatus.pending ||
          options.value === OrderStatus.processing ||
          options.value === OrderStatus.cancelled)
      ) {
        return false
      }
      return true
    })
    .map((option) => ({
      label: (
        <Tag bordered={false} color={getOrderStatus(option.value).color} className='!w-full !text-center'>
          {getOrderStatus(option.value).name}
        </Tag>
      ),
      key: option.value
    }))
  const handleChangeStatus = async (e: any) => {
    setLoading(true)

    try {
      if (e.key === OrderStatus.processing) {
        const response = await updateOrderProcessingStatusAPI(id)
        setLoading(false)
        if (response) {
          notification.success({ message: `Cập nhật trạng thái thành công` })
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      }
      if (e.key === OrderStatus.shipping) {
        const payload: { id: number; strategyType: 'ORDER' | 'BOOKING' } = {
          id: id,
          strategyType: 'ORDER'
        }
        const response = await updateOrderShippingStatusAPI(payload)
        setLoading(false)
        if (response) {
          notification.success({ message: `Cập nhật trạng thái thành công` })
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      }
      if (e.key === OrderStatus.delivered) {
        const response = await updateOrderDeliveredStatusAPI(id)
        setLoading(false)
        if (response) {
          notification.success({ message: `Cập nhật trạng thái thành công` })
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  if (status === OrderStatus.delivered || status === OrderStatus.cancelled) {
    return (
      <Tag bordered={false} color={getOrderStatus(status).color} className='!w-full !text-center'>
        {getOrderStatus(status).name}
      </Tag>
    )
  }
  return (
    <Spin spinning={loading}>
      <Dropdown
        menu={{ items, onClick: handleChangeStatus }}
        trigger={['click']}
        placement='bottomRight'
        className='cursor-pointer'
      >
        <Tag bordered={false} color={getOrderStatus(status).color} className='!w-full !text-center'>
          {getOrderStatus(status).name}
        </Tag>
      </Dropdown>
    </Spin>
  )
}

export default UpdateOrderStatus

import { App, Dropdown, Spin, Tag } from 'antd'
import type { MenuProps } from 'antd/lib'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { BookingDetail, BookingStatus, updateBookingStatusAPI } from '~/utils/api/booking'
import { getBookingStatus } from '~/utils/statusUtils'
type UpdateBookingStatusProps = {
  status: BookingStatus | string
  bookingDetail: BookingDetail
  id: number
}

const UpdateBookingStatus: React.FC<UpdateBookingStatusProps> = ({ status, id, bookingDetail }) => {
  console.log(bookingDetail)
  const [currentStatus, setCurrentStatus] = useState<BookingStatus | string>(status)
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const options = [
    { value: BookingStatus.pending },
    { value: BookingStatus.confirmed },
    { value: BookingStatus.preparing },
    { value: BookingStatus.shipping },
    { value: BookingStatus.delivered },
    { value: BookingStatus.cancelled }
  ]
  const items: MenuProps['items'] = options
    .filter((options) => {
      if (options.value === status) {
        return false
      }
      if (
        status === BookingStatus.confirmed &&
        (options.value === BookingStatus.pending ||
          options.value === BookingStatus.delivered ||
          options.value === BookingStatus.shipping)
      ) {
        return false
      }
      if (
        status === BookingStatus.preparing &&
        (options.value === BookingStatus.pending ||
          options.value === BookingStatus.delivered ||
          options.value === BookingStatus.confirmed)
      ) {
        return false
      }
      if (
        status === BookingStatus.shipping &&
        (options.value === BookingStatus.pending ||
          options.value === BookingStatus.confirmed ||
          options.value === BookingStatus.preparing ||
          options.value === BookingStatus.cancelled)
      ) {
        return false
      }
      return true
    })
    .map((option) => ({
      label: (
        <Tag bordered={false} color={getBookingStatus(option.value).color} className='!w-full !text-center'>
          {getBookingStatus(option.value).name}
        </Tag>
      ),
      key: option.value
    }))

  const handleChangeStatus = async (e: any) => {
    setLoading(true)
    try {
      const response = await updateBookingStatusAPI(id, e)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Cập nhật trạng thái thành công' })
        setCurrentStatus(e)
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  const onClick: MenuProps['onClick'] = ({ key }) => {
    handleChangeStatus(key)
  }
  if (status === BookingStatus.delivered || status === BookingStatus.cancelled) {
    return (
      <Tag bordered={false} color={getBookingStatus(currentStatus).color} className='!w-full !text-center'>
        {getBookingStatus(currentStatus).name}
      </Tag>
    )
  }
  return (
    <Spin spinning={loading}>
      <Dropdown menu={{ items, onClick }} trigger={['click']} placement='bottomRight' className='cursor-pointer'>
        <a onClick={(e) => e.currentTarget}>
          <Tag bordered={false} color={getBookingStatus(currentStatus).color} className='!w-full !text-center'>
            {getBookingStatus(currentStatus).name}
          </Tag>
        </a>
      </Dropdown>
    </Spin>
  )
}

export default UpdateBookingStatus

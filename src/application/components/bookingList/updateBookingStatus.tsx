import { App, Dropdown, Spin, Tag } from 'antd'
import type { MenuProps } from 'antd/lib'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import {
  BookingDetail,
  BookingStatus,
  updateBookingStatusAPI,
  updateStatusBookingDeatailAPI
} from '~/utils/api/booking'
import { getBookingDetailStatus, getBookingStatus } from '~/utils/statusUtils'
type UpdateBookingStatusProps = {
  status: BookingStatus | string
  bookingDetail: BookingDetail
  id: number
}

const UpdateBookingStatus: React.FC<UpdateBookingStatusProps> = ({ status, id, bookingDetail }) => {
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
  const options2 = [
    { value: 'Waiting' },
    { value: 'In_Breeding_Progress' },
    { value: 'Brooding' },
    { value: 'Fledgling_All' },
    { value: BookingStatus.preparing },
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
  const items2: MenuProps['items'] = options2
    .filter((options) => {
      if (options.value === bookingDetail.status) {
        return false
      }
      if (
        bookingDetail.status === 'Waiting' &&
        (options.value === 'Preparing' || options.value === 'Brooding' || options.value === 'Fledgling_All')
      ) {
        return false
      }
      if (
        bookingDetail.status === 'In_Breeding_Progress' &&
        (options.value === 'Preparing' || options.value === 'Waiting' || options.value === 'Fledgling_All')
      ) {
        return false
      }
      if (
        bookingDetail.status === 'Brooding' &&
        (options.value === 'Preparing' || options.value === 'Waiting' || options.value === 'In_Breeding_Progress')
      ) {
        return false
      }
      if (
        bookingDetail.status === 'Fledgling_All' &&
        (options.value === 'Waiting' || options.value === 'In_Breeding_Progress' || options.value === 'Brooding')
      ) {
        return false
      }

      return true
    })
    .map((option) => ({
      label: (
        <Tag bordered={false} color={getBookingDetailStatus(option.value).color} className='!w-full !text-center'>
          {getBookingDetailStatus(option.value).name}
        </Tag>
      ),
      key: option.value
    }))
  const handleChangeStatus = async (e: any) => {
    setLoading(true)
    try {
      if (e === 'Cancelled' || e === 'Preparing') {
        const response = await updateBookingStatusAPI(id, e)
        setLoading(false)
        if (response) {
          notification.success({ message: 'Cập nhật trạng thái thành công' })
          dispatch(reFetchData())
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      } else {
        const response = await updateStatusBookingDeatailAPI(bookingDetail.id, e)
        setLoading(false)
        if (response) {
          notification.success({ message: 'Cập nhật trạng thái thành công' })
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
  const onClick: MenuProps['onClick'] = ({ key }) => {
    handleChangeStatus(key)
  }
  if (status === BookingStatus.delivered || status === BookingStatus.cancelled) {
    return (
      <Tag bordered={false} color={getBookingStatus(status).color} className='!w-full !text-center'>
        {getBookingStatus(status).name}
      </Tag>
    )
  }
  if (status === BookingStatus.confirmed) {
    return (
      <Spin spinning={loading}>
        <Dropdown
          menu={{ items: items2, onClick }}
          trigger={['click']}
          placement='bottomRight'
          className='cursor-pointer'
        >
          <a onClick={(e) => e.currentTarget}>
            <Tag
              bordered={false}
              color={getBookingDetailStatus(bookingDetail.status).color}
              className='!w-full !text-center'
            >
              {getBookingDetailStatus(bookingDetail.status).name}
            </Tag>
          </a>
        </Dropdown>
      </Spin>
    )
  }
  return (
    <Spin spinning={loading}>
      <Dropdown menu={{ items, onClick }} trigger={['click']} placement='bottomRight' className='cursor-pointer'>
        <a onClick={(e) => e.currentTarget}>
          <Tag bordered={false} color={getBookingStatus(status).color} className='!w-full !text-center'>
            {getBookingStatus(status).name}
          </Tag>
        </a>
      </Dropdown>
    </Spin>
  )
}

export default UpdateBookingStatus

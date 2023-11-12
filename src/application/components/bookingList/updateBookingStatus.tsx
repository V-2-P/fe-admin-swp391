import { App, Dropdown, Spin, Tag } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { BookingStatus, updateBookingStatusAPI } from '~/utils/api/booking'
import { getBookingStatus } from '~/utils/statusUtils'
type UpdateBookingStatusProps = {
  status: BookingStatus | string
  id: number
}
const options = [{ value: BookingStatus.shipping }]
const UpdateBookingStatus: React.FC<UpdateBookingStatusProps> = ({ status, id }) => {
  const [currentStatus, setCurrentStatus] = useState<BookingStatus | string>(status)
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  console.log(status)
  const items = options.map((option) => ({
    label: (
      <Tag bordered={false} color={getBookingStatus(option.value).color}>
        {getBookingStatus(option.value).name}
      </Tag>
    ),
    key: option.value
  }))

  const handleChangeStatus = async (e: any) => {
    setLoading(true)
    try {
      const response = await updateBookingStatusAPI(id, status)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Cập nhật trạng thái thành công' })
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
  if (currentStatus === BookingStatus.pending) {
    return (
      <Spin spinning={loading}>
        <Dropdown
          menu={{ items, onClick: handleChangeStatus }}
          trigger={['click']}
          placement='bottomRight'
          className='cursor-pointer'
        >
          <Tag bordered={false} color={getBookingStatus(currentStatus).color}>
            {getBookingStatus(currentStatus).name}
          </Tag>
        </Dropdown>
      </Spin>
    )
  }
  if (currentStatus === BookingStatus.shipping) {
    return (
      <Link to={`/delivery/${id}`}>
        <Tag bordered={false} color={getBookingStatus(currentStatus).color}>
          {getBookingStatus(currentStatus).name}
        </Tag>
      </Link>
    )
  }
  return (
    <Tag bordered={false} color={getBookingStatus(currentStatus).color}>
      {getBookingStatus(currentStatus).name}
    </Tag>
  )
}

export default UpdateBookingStatus

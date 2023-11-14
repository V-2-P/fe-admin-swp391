import { App, Dropdown, Spin, Tag } from 'antd'
import type { MenuProps } from 'antd/lib'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { BookingStatus, updateBookingStatusAPI } from '~/utils/api/booking'
import { getBookingStatus } from '~/utils/statusUtils'
type UpdateBookingStatusProps = {
  status: BookingStatus | string
  id: number
}
const options = [{ value: BookingStatus.preparing }]
const UpdateBookingStatus: React.FC<UpdateBookingStatusProps> = ({ status, id }) => {
  const [currentStatus, setCurrentStatus] = useState<BookingStatus | string>(status)
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const items: MenuProps['items'] = options.map((option) => ({
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
  console.log(currentStatus)
  return (
    <Spin spinning={loading}>
      <Dropdown menu={{ items, onClick }} trigger={['click']} placement='bottomRight' className='cursor-pointer'>
        <a onClick={(e) => e.currentTarget}>
          <Tag bordered={false} color={getBookingStatus(currentStatus).color}>
            {getBookingStatus(currentStatus).name}
          </Tag>
        </a>
      </Dropdown>
    </Spin>
  )
}

export default UpdateBookingStatus

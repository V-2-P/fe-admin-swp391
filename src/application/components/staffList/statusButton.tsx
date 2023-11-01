import { App, Select } from 'antd'
import React, { useMemo, useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { UpdateUserPayload, updateUserAPI } from '~/utils/api'

type StatusButtonTypes = {
  status: number
  id: number
}

const SatusButton: React.FC<StatusButtonTypes> = ({ status, id }) => {
  const dispatch = useAppDispatch()
  const { notification } = App.useApp()
  const staffStatus = useMemo(
    () => [
      { value: '1', label: 'Hoạt động' },
      { value: '0', label: 'Ngừng hoạt động' },
      { value: '2', label: 'Nghỉ phép' }
    ],
    []
  )
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const handleChangeStatus = async (value: string) => {
    setIsButtonLoading(true)
    try {
      const payload: UpdateUserPayload = {
        isActive: value
      }
      const response = await updateUserAPI(id, payload)
      setIsButtonLoading(false)
      if (response) {
        notification.success({ message: `Cập nhật trạng thái thành công` })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setIsButtonLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  return (
    <Select
      value={{
        value: status.toString(),
        label: staffStatus.find((e) => e.value === status.toString())?.label
      }}
      loading={isButtonLoading}
      onChange={(value: any) => handleChangeStatus(value)}
      placeholder='Chọn trạng thái'
      options={staffStatus}
      size='large'
      className='w-full'
    />
  )
}

export default SatusButton

import { Button, App } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { updateStatusBookingDeatailAPI } from '~/utils/api/booking'

type ConfirmButtonProps = {
  id: number
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const onClick = async () => {
    setLoading(true)
    try {
      const response = await updateStatusBookingDeatailAPI(id, 'In_Breeding_Progress')
      setLoading(false)
      if (response) {
        notification.success({ message: 'Cập nhật trạng thái thành công' })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  return (
    <Button type='link' loading={loading} onClick={onClick}>
      Xác nhận
    </Button>
  )
}

export default ConfirmButton

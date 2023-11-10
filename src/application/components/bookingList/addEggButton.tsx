import { Button, notification } from 'antd'
import React, { useState } from 'react'
import { Booking, postBirdPairing } from '~/utils/api/booking'

type AddEggButtonType = {
  booking: Booking
}

const AddEggButton: React.FC<AddEggButtonType> = ({ booking }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const addEgg = async (values: Booking) => {
    setLoading(true)
    const payload = {
      bookingDetailId: values.bookingDetail.id
    }
    try {
      const response = await postBirdPairing(payload)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Thêm trứng thành công' })
      } else {
        notification.success({ message: 'Thêm trứng thất bại' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  return (
    <div>
      <Button loading={loading} type='link' onClick={() => addEgg(booking)}>
        Thêm trứng
      </Button>
    </div>
  )
}

export default AddEggButton

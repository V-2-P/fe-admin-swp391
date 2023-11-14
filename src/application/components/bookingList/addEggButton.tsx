import { Button, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { reFetchData } from '~/redux/slices'
import { Booking, postBirdPairing } from '~/utils/api/booking'

type AddEggButtonType = {
  booking: Booking
}

const AddEggButton: React.FC<AddEggButtonType> = ({ booking }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
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
        dispatch(reFetchData())
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

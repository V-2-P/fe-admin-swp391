import { Button, notification } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { updateStatusAPI } from '~/utils/api'

type BanCustomerType = {
  id: number
  isActive: number
}

const BanCustomer: React.FC<BanCustomerType> = ({ id, isActive }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const changeStatus = async () => {
    setIsLoading(true)
    try {
      const payload = {
        isActive: isActive == 1 ? '0' : '1'
      }
      const response = await updateStatusAPI(id, payload)
      setIsLoading(false)
      if (response) {
        notification.success({ message: `Cập nhật khách hàng thành công` })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setIsLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  return (
    <Button loading={isLoading} onClick={changeStatus} type='link'>
      {isActive ? 'Khóa' : 'Mở khóa'}
    </Button>
  )
}

export default BanCustomer

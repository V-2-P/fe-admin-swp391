import { Button, Space, App } from 'antd'
import React, { useState } from 'react'

type Callbacks = {
  (args?: any): Promise<void>
}

type DeleteButtonTypes = {
  onDelete?: Callbacks
}

const DeleteButton: React.FC<DeleteButtonTypes> = ({ onDelete }) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { notification } = App.useApp()
  const handleDelete = async (e: any) => {
    e.stopPropagation()
    setDeleteLoading(true)

    try {
      if (onDelete) {
        await onDelete()
      }

      setDeleteLoading(false)
    } catch (err) {
      setDeleteLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  return (
    <Space size='middle'>
      <Button loading={deleteLoading} danger onClick={handleDelete}>
        Xóa
      </Button>
    </Space>
  )
}

export default DeleteButton

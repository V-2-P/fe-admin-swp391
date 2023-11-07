import React, { useState } from 'react'
import { Card, Modal, Skeleton, Typography, Button, Row, Col, Descriptions, notification } from 'antd'
import type { DescriptionsProps } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { getFeedbackById } from '~/utils/api/feedback/function'
const { Link } = Typography

type FeedbackDetailType = {
  id: string | number
}

interface BirdReview {
  id: number
  birdId: number
  userImage: string
  birdName: string
  rating: number
  comment: string
  birdType: string
  orderId: number
  fullName: string
  address: string
  phoneNumber: string
  status: boolean
  createdAt: string
}

const FeedbackDetail: React.FC<FeedbackDetailType> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<BirdReview>()
  const userDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên',
      children: data?.fullName,
      span: 3
    },
    {
      key: '2',
      label: 'Địa chỉ',
      children: data?.address,
      span: 3
    },
    {
      key: '3',
      label: 'SĐT',
      children: data?.phoneNumber,
      span: 3
    }
  ]
  const feedbackDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Mã đơn hàng',
      children: data?.orderId,
      span: 3
    },
    {
      key: '2',
      label: 'Mã chim',
      children: data?.birdId,
      span: 3
    },
    {
      key: '3',
      label: 'Chim',
      children: data?.birdName,
      span: 3
    },
    {
      key: '4',
      label: 'Số sao',
      children: (
        <div className='flex flex-row gap-1 items-center justify-center'>
          <StarFilled className='!text-orange-500' />
          <span>{data?.rating}</span>
        </div>
      ),
      span: 3
    },
    {
      key: '5',
      label: 'Đánh giá',
      children: data?.comment,
      span: 3
    },
    {
      key: '6',
      label: 'Trạng thái',
      children: data && data?.status ? 'Hiện' : 'Ẩn',
      span: 3
    },
    {
      key: '7',
      label: 'Ngày đánh giá',
      children: data?.createdAt,
      span: 3
    }
  ]
  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setLoading(true)
    try {
      const response = await getFeedbackById(id)
      setLoading(false)
      if (response) {
        setData(response.data)
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <>
      <Link href='' onClick={showModal}>
        Xem
      </Link>

      <Modal
        title={`Thông tin đánh giá chi tiết`}
        style={{ top: 20 }}
        width={1000}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Descriptions title='Thông tin khách hàng' bordered={false} items={userDescription} />
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Descriptions title='Thông tin đánh giá' bordered={false} items={feedbackDescription} />
              </Card>
            </Col>
          </Row>
        </Skeleton>
      </Modal>
    </>
  )
}

export default FeedbackDetail

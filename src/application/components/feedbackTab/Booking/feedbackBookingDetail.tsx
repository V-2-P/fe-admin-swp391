import {
  Button,
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Modal,
  Row,
  Skeleton,
  Typography,
  notification
} from 'antd'
import React, { useState } from 'react'
import { getFeedbacBookingkByIdAPI } from '~/utils/api/feedback/function'
import { FeedbackBooking } from '~/utils/api/feedback/type'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
import { StarFilled } from '@ant-design/icons'
const { Link } = Typography

type FeedbackDetailType = {
  id: string | number
}

const FeedbackBookingDetail: React.FC<FeedbackDetailType> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<FeedbackBooking>()
  const userDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên',
      children: data?.booking.fullName,
      span: 3
    },
    {
      key: '2',
      label: 'Địa chỉ',
      children: data?.booking.shippingAddress,
      span: 3
    },
    {
      key: '3',
      label: 'SĐT',
      children: data?.booking.phoneNumber,
      span: 3
    }
  ]
  const feedbackbookingDescription: DescriptionsProps['items'] = [
    {
      label: 'Mã đơn hàng',
      children: data?.booking.id,
      span: 3
    },
    {
      label: 'Thời gian tạo',
      children: formatDateToDDMMYYYY(new Date(data ? data.booking.createdAt : '')),
      span: 3
    },
    {
      label: 'Tên chim bố',
      children: data?.booking.bookingDetail.fatherBird.name,
      span: 3
    },
    {
      label: 'Tên chim mẹ',
      children: data?.booking.bookingDetail.motherBird.name,
      span: 3
    },
    {
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
      label: 'Đánh giá',
      children: data?.comment,
      span: 3
    }
  ]
  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setLoading(true)
    try {
      const response = await getFeedbacBookingkByIdAPI(id)
      setLoading(false)
      if (response) {
        setData(response.data)
        console.log(data)
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
                <Descriptions title='Thông tin đánh giá' bordered={false} items={feedbackbookingDescription} />
              </Card>
            </Col>
          </Row>
        </Skeleton>
      </Modal>
    </>
  )
}

export default FeedbackBookingDetail

import { Button, Card, Col, Descriptions, Grid, Modal, Row, Skeleton, notification } from 'antd'
import { DescriptionsProps } from 'antd/lib'
import React, { useState } from 'react'
import { Booking, getBookingByIdAPI } from '~/utils/api/booking'
const { useBreakpoint } = Grid

type BookingDetailButtonType = {
  id: number
}

const BookingDetailModal: React.FC<BookingDetailButtonType> = ({ id }) => {
  const screens = useBreakpoint()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Booking>()
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setLoading(loading)
    try {
      const response = await getBookingByIdAPI(id)
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
  const userDescription: DescriptionsProps['items'] = [
    {
      label: 'Tên khách hàng',
      children: data?.fullName,
      span: 3
    },
    {
      label: 'Số điện thoại',
      children: data?.phoneNumber,
      span: 3
    },
    {
      label: 'Địa chỉ',
      children: data?.shippingAddress,
      span: 3
    }
  ]
  const paymentDescription: DescriptionsProps['items'] = [
    {
      label: 'Phương thức thanh toán',
      children: data?.paymentMethod,
      span: 3
    },
    {
      label: 'Tiền đặt cọc',
      children: data?.paymentDeposit,
      span: 3
    },
    {
      label: 'Tổng tiền',
      children: data?.totalPayment,
      span: 3
    }
  ]
  return (
    <div>
      <Button type='link' onClick={showModal}>
        Xem
      </Button>
      <Modal
        style={{ top: 20 }}
        width={1000}
        open={open}
        onCancel={handleCancel}
        title={`Thông tin đơn lai chim ${id}`}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Row gutter={[16, 16]}>
            <Col span={screens.md ? 12 : 24}>
              <Card>
                <Descriptions title='Thông tin khách hàng' items={userDescription} />
              </Card>
            </Col>
            <Col span={screens.md ? 12 : 24}>
              <Card>
                <Descriptions title='Thông tin thanh toán' items={paymentDescription} />
              </Card>
            </Col>
          </Row>
        </Skeleton>
      </Modal>
    </div>
  )
}

export default BookingDetailModal

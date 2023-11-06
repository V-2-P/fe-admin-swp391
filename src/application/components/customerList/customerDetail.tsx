import { Avatar, Button, Card, Col, Descriptions, Modal, Row, Skeleton, Tag, notification } from 'antd'
import type { DescriptionsProps } from 'antd'
import React, { useState } from 'react'
import { User, getUserByIdAPI } from '~/utils/api'
import { UserOutlined } from '@ant-design/icons'
import { formatCurrencyVND } from '~/utils/numberUtils'

type CustomerDetailType = {
  id: number
}

const CustomerDetail: React.FC<CustomerDetailType> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<User>()
  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setLoading(true)
    try {
      const response = await getUserByIdAPI(id)
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
      label: 'Avatar',
      children: (
        <Avatar size={100} src={data?.imageUrl} icon={<UserOutlined />} crossOrigin='anonymous' alt='user-image' />
      ),
      span: 3
    },
    {
      label: 'Tên',
      children: data?.fullName,
      span: 1.5
    },
    {
      label: 'Role',
      children: <Tag color='success'>{data?.roleEntity?.name}</Tag>,
      span: 1.5
    },
    {
      label: 'Số điện thoại',
      children: data?.phoneNumber,
      span: 3
    },
    {
      label: 'Địa chỉ',
      children: data?.address,
      span: 3
    },
    {
      label: 'Ngày sinh',
      children: data?.dob,
      span: 3
    },
    {
      label: 'Tổng đơn hàng',
      children: data?.orderQuantity,
      span: 1.5
    },
    {
      label: 'Tổng đơn lai chim',
      children: data?.bookingQuantity,
      span: 1.5
    },
    {
      label: 'Tổng số tiền',
      children: data?.totalMoney ? formatCurrencyVND(data?.totalMoney) : 0,
      span: 3
    },
    {
      label: 'Action',
      children: (
        <>
          <Button type='link'>Xem tổng đơn đặt hàng</Button>
          <Button type='link'>Xem tổng đơn lai chim</Button>
        </>
      ),
      span: 3
    }
  ]

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <div>
      <Button type='link' onClick={showModal}>
        Xem
      </Button>
      <Modal
        title={`Thông tin khách hàng`}
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
                <Descriptions bordered items={userDescription} />
              </Card>
            </Col>
            {/* <Col span={24}>
              <Card>
                <Descriptions title='Thông tin đánh giá' bordered={false} items={feedbackDescription} />
              </Card>
            </Col> */}
          </Row>
        </Skeleton>
      </Modal>
    </div>
  )
}

export default CustomerDetail

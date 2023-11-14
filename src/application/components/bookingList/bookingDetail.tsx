import { Button, Card, Col, Descriptions, Grid, Modal, Row, Skeleton, Space, Typography, notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { DescriptionsProps, Table } from 'antd/lib'
import React, { useState } from 'react'
import { BirdPairing, Booking, getBookingByIdAPI, updateStatusPairingAPI } from '~/utils/api/booking'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
import BirdDetail from '../birdList/birdDetail'
import AddEggButton from './addEggButton'
import { reFetchData } from '~/redux/slices'
import { useDispatch } from 'react-redux'
const { useBreakpoint } = Grid

const { Title } = Typography

type BookingDetailButtonType = {
  id: number
}

const BookingDetailModal: React.FC<BookingDetailButtonType> = ({ id }) => {
  const screens = useBreakpoint()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Booking>()
  const dispatch = useDispatch()
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

  const changeStatusPairing = async (status: string, id: number) => {
    setLoading(true)
    try {
      setLoading(false)
      const response = await updateStatusPairingAPI(id, status)
      if (response) {
        notification.success({ message: 'Successful' })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const fatherBirdDescription: DescriptionsProps['items'] = [
    {
      label: 'Tên ',
      children: data?.bookingDetail.fatherBird.name,
      span: 3
    },
    {
      label: 'Phân loại',
      children: data?.bookingDetail.fatherBird.category.name,
      span: 3
    },
    {
      label: 'Giống loài',
      children: data?.bookingDetail.fatherBird.birdType.name,
      span: 3
    },
    {
      label: 'Tuổi',
      children: data?.bookingDetail.fatherBird.age,
      span: 3
    },
    {
      label: 'Màu sắc',
      children: data?.bookingDetail.fatherBird.color,
      span: 3
    },
    {
      label: 'Độ thuần chủng',
      children: data?.bookingDetail.fatherBird.purebredLevel
    }
  ]

  const motherBirdDescription: DescriptionsProps['items'] = [
    {
      label: 'Tên ',
      children: data?.bookingDetail.motherBird.name,
      span: 3
    },
    {
      label: 'Phân loại',
      children: data?.bookingDetail.motherBird.category.name,
      span: 3
    },
    {
      label: 'Giống loài',
      children: data?.bookingDetail.motherBird.birdType.name,
      span: 3
    },
    {
      label: 'Tuổi',
      children: data?.bookingDetail.motherBird.age,
      span: 3
    },
    {
      label: 'Màu sắc',
      children: data?.bookingDetail.motherBird.color,
      span: 3
    },
    {
      label: 'Độ thuần chủng',
      children: data?.bookingDetail.motherBird.purebredLevel
    }
  ]

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
  const orderColumns: ColumnsType<BirdPairing> = [
    {
      title: 'Mã đơn hàng',
      width: '20%',
      dataIndex: 'id'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (_, { createdAt }) => {
        return formatDateToDDMMYYYY(new Date(createdAt))
      },
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '30%'
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (_, record) => (
        <Space size='middle'>
          {record.status === 'Fledgling' ? <BirdDetail id={record.newBird.id} /> : <></>}
          {record.status === 'Egg' ? (
            <>
              <Button
                type='link'
                loading={loading}
                className='!p-0'
                onClick={() => changeStatusPairing('Fledgling', record.id)}
              >
                Đã nở
              </Button>
              <Button
                type='link'
                loading={loading}
                className='!p-0'
                onClick={() => changeStatusPairing('Failed', record.id)}
              >
                Trứng hư
              </Button>
            </>
          ) : (
            <></>
          )}
        </Space>
      )
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
                <Descriptions title='Thông tin chim bố' items={fatherBirdDescription} />
              </Card>
            </Col>
            <Col span={screens.md ? 12 : 24}>
              <Card>
                <Descriptions title='Thông tin chim mẹ' items={motherBirdDescription} />
              </Card>
            </Col>
            <Col span={24}>
              <div className='flex flex-row justify-between items-center'>
                <Title level={3}>Thông tin chim lai</Title>
                <AddEggButton booking={data!} />
              </div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    className: 'cursor-pointer',
                    onClick: () => {
                      console.log(record, rowIndex)
                    }
                  }
                }}
                columns={orderColumns}
                dataSource={data ? data.bookingDetail?.birdPairing : []}
                pagination={false}
              />
            </Col>
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

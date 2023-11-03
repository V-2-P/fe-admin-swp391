import React, { useState } from 'react'
import {
  Card,
  Modal,
  Skeleton,
  Typography,
  Button,
  App,
  Steps,
  Popover,
  Table,
  Space,
  Row,
  Col,
  Descriptions,
  Grid
} from 'antd'
import { ShoppingCartOutlined, InboxOutlined, CarOutlined, CarryOutOutlined } from '@ant-design/icons'
import type { StepProps, DescriptionsProps } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'
import type { ColumnsType } from 'antd/es/table'
import TrackingModal from './trackingModal'
import { getOrderByIdAPI, Order, OrderDetail, OrderStatus } from '~/utils/api'
const { Link, Text } = Typography
const { useBreakpoint } = Grid
type OrderDetailButtonType = {
  id: number
}
interface OrderStep {
  status: 'wait' | 'error' | 'process' | 'finish'
  current: number
}

const OrderDetailButton: React.FC<OrderDetailButtonType> = ({ id }) => {
  const screens = useBreakpoint()
  const { notification } = App.useApp()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Order>()
  const [orderStep, setOrderStep] = useState<OrderStep>({
    status: 'process',
    current: 1
  })
  const stepItems: StepProps[] = [
    {
      title: orderStep.current > 0 ? 'Đã xác nhận' : 'Chờ xác nhận',
      icon:
        orderStep.current === 0 && orderStep.status === 'error' ? null : (
          <Popover content={<span>Aug 12, 2023 05.03am</span>}>
            <ShoppingCartOutlined />
          </Popover>
        )
    },
    {
      title: orderStep.current === 1 ? 'Đang xử lý' : orderStep.current > 1 ? 'Đã xử lý' : 'Chờ xử lý',
      icon:
        orderStep.current === 1 && orderStep.status === 'error' ? null : (
          <Popover content={<span>Aug 12, 2023 05.03am</span>}>
            <InboxOutlined />
          </Popover>
        )
    },
    {
      title: orderStep.current === 2 ? 'Đang vận chuyển' : orderStep.current > 2 ? 'Đã vận chuyển' : 'Chờ vận chuyển',
      icon:
        orderStep.current === 2 && orderStep.status === 'error' ? null : (
          <Popover content={<span>Aug 12, 2023 05.03am</span>}>
            <CarOutlined />
          </Popover>
        )
    },
    {
      title: orderStep.current === 3 ? 'Đang giao hàng' : orderStep.current > 3 ? 'Đã giao hàng' : 'Chờ giao hàng',
      icon:
        orderStep.current === 3 && orderStep.status === 'error' ? null : (
          <Popover content={<span>Aug 12, 2023 05.03am</span>}>
            <CarryOutOutlined />
          </Popover>
        )
    }
  ]
  const orderColumns: ColumnsType<OrderDetail> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'birdName'
    },
    {
      title: 'Số lượng',
      dataIndex: 'numberOfProducts',
      align: 'right'
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      align: 'right',
      render: (_, { price }) => {
        return formatCurrencyVND(price)
      }
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      align: 'right',
      render: (_, { numberOfProducts, price }) => {
        return formatCurrencyVND(numberOfProducts * price)
      }
    }
  ]
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
      children: data?.shippingAddress,
      span: 3
    },
    {
      key: '3',
      label: 'Số điện thoại',
      children: data?.phoneNumber,
      span: 3
    }
  ]
  const paymentDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Phương thức thanh toán',
      children: data?.paymentMethod,
      span: 3
    },
    {
      key: '2',
      label: 'Giao hàng',
      children: data?.shippingMethod,
      span: 3
    },
    {
      key: '3',
      label: 'Mã giao hàng',
      children: data?.trackingNumber,
      span: 3
    }
  ]

  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setLoading(true)
    try {
      const response = await getOrderByIdAPI(id)
      setLoading(false)
      if (response) {
        const status = response.data.status as OrderStatus
        setData(response.data)
        if (status == OrderStatus.pending) {
          setOrderStep({
            status: 'process',
            current: 0
          })
        } else if (status == OrderStatus.processing) {
          setOrderStep({
            status: 'process',
            current: 1
          })
        } else if (status == OrderStatus.shipping) {
          setOrderStep({
            status: 'process',
            current: 2
          })
        } else if (status == OrderStatus.delivered) {
          setOrderStep({
            status: 'process',
            current: 3
          })
        }
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
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
        title={`Thông tin đơn hàng ${id}`}
        style={{ top: 20 }}
        width={1000}
        open={open}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Đóng
          </Button>,
          <TrackingModal buttonLoading={loading} id={id} />
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Space direction='vertical' className='w-full' size='large'>
            <Steps
              className='custom-step-content'
              // onChange={onStepChange}
              current={orderStep.current}
              status={orderStep.status}
              labelPlacement='vertical'
              items={stepItems}
            />
            <Row gutter={[16, 16]}>
              <Col span={24}>
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
                  dataSource={data ? data.orderDetails : []}
                  pagination={false}
                  summary={() => {
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Tồng tiền hàng:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(data?.totalMoney)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>

                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Phí vận chuyển:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(data?.shippingMoney)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>

                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Giảm giá:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(data?.discount)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>

                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Thành tiền:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(data?.totalPayment)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    )
                  }}
                />
              </Col>
              <Col span={screens.md ? 12 : 24}>
                <Card>
                  <Descriptions title='Thông tin khách hàng' bordered={false} items={userDescription} />
                </Card>
              </Col>
              <Col span={screens.md ? 12 : 24}>
                <Card>
                  <Descriptions title='Thông tin thanh toán' bordered={false} items={paymentDescription} />
                </Card>
              </Col>
            </Row>
          </Space>
        </Skeleton>
      </Modal>
    </>
  )
}

export default OrderDetailButton

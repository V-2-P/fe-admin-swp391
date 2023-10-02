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
const { Link, Text } = Typography
const { useBreakpoint } = Grid
type OrderDetailType = {
  id: string | number
}
interface OrderStep {
  status: 'wait' | 'error' | 'process' | 'finish'
  current: number
}
interface Order {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}
interface Customer {
  id: string
  name: string
  phone: string
  address: string
}
interface DataType {
  id: string
  orderList: Order[]
  discount: number
  subTotal: number
  total: number
  customer: Customer
  payment: string
  deliveredBy: string
  trackingId: string
}
const dataTable: DataType = {
  id: '1',
  orderList: [
    { id: 'o1', name: 'Bánh mì', quantity: 2, price: 10000, total: 20000 },
    { id: 'o2', name: 'Nước ngọt', quantity: 1, price: 5000, total: 5000 }
  ],
  discount: 5000,
  subTotal: 25000,
  total: 20000,
  customer: {
    id: 'c1',
    name: 'Nguyễn Văn A',
    phone: '01234567',
    address: 'Hà Nội'
  },
  payment: 'Tiền mặt',
  deliveredBy: 'Giao hàng nhanh',
  trackingId: 'fastdelivery1'
}

const OrderDetail: React.FC<OrderDetailType> = ({ id }) => {
  const screens = useBreakpoint()
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
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
  const orderColumns: ColumnsType<Order> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
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
      render: (_, { total }) => {
        return formatCurrencyVND(total)
      }
    }
  ]
  const userDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên',
      children: dataTable.customer.name,
      span: 3
    },
    {
      key: '2',
      label: 'Địa chỉ',
      children: dataTable.customer.address,
      span: 3
    },
    {
      key: '3',
      label: 'SĐT',
      children: dataTable.customer.phone,
      span: 3
    }
  ]
  const paymentDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Phương thức thanh toán',
      children: dataTable.payment,
      span: 3
    },
    {
      key: '2',
      label: 'Giao hàng',
      children: dataTable.deliveredBy,
      span: 3
    },
    {
      key: '3',
      label: 'Mã giao hàng',
      children: dataTable.trackingId,
      span: 3
    }
  ]
  const showModal = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(id)
    // fetch dữ liệu ở đây
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
      message.success('Click on Yes')
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const onStepChange = (value: number) => {
    setOrderStep({
      status: 'process',
      current: value
    })
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
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>,
          <TrackingModal buttonLoading={loading} id={id} />,
          <Button key='submit' type='primary' loading={confirmLoading} disabled={loading} onClick={handleOk}>
            Đồng ý
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Space direction='vertical' className='w-full' size='large'>
            <Steps
              className='custom-step-content'
              onChange={onStepChange}
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
                  dataSource={dataTable.orderList}
                  pagination={false}
                  summary={() => {
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Sub-Total:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(dataTable.subTotal)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>

                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Discount:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(dataTable.discount)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>

                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2} align='right'>
                            <b>Total:</b>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={2} align='right'>
                            <Text>{formatCurrencyVND(dataTable.total)}</Text>
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

export default OrderDetail

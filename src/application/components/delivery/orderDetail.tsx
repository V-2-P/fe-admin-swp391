import React, { useState } from 'react'
import { Card, Modal, Skeleton, Typography, Button, App, Table, Space, Row, Col, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'
import type { ColumnsType } from 'antd/es/table'
const { Text } = Typography

type OrderDetailType = {
  id: string | number
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
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

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

  return (
    <>
      <Button type='link' onClick={showModal}>
        Xem
      </Button>

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
          <Button key='submit' type='primary' loading={confirmLoading} disabled={loading} onClick={handleOk}>
            Đồng ý
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Space direction='vertical' className='w-full' size='large'>
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
              <Col span={24}>
                <Card>
                  <Descriptions title='Thông tin khách hàng' bordered={false} items={userDescription} />
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

import React, { useState } from 'react'
import { Space, Typography, Row, Col, Card, App, Form, Button, Select, Input, Table } from 'antd'
import axiosClient from '~/utils/api/AxiosClient'
import DebounceSelect, { OptionType } from '~/application/components/shared/DebounceSelect'
import { DeliveryFieldType } from '~/application/components/delivery/type'
import type { ColumnsType } from 'antd/es/table'
import { formatCurrencyVNDToString } from '~/utils/numberUtils'
import OrderDetail from '~/application/components/delivery/orderDetail'

const { Title, Text } = Typography

interface DataType {
  key: string
  orderId: string
  customer: string
  quantity: number
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Đơn hàng',
    dataIndex: 'orderId'
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customer'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => <OrderDetail id={record.orderId} />,
    width: '20%'
  }
]

const data: DataType[] = [
  {
    key: '1',
    customer: 'John Brown',
    quantity: 10,
    orderId: '#INV10001'
  },
  {
    key: '2',
    customer: 'Jim Green',
    quantity: 100,
    orderId: '#INV10002'
  },
  {
    key: '3',
    customer: 'Joe Black',
    quantity: 10,
    orderId: '#INV10003'
  },
  {
    key: '4',
    customer: 'Jim Red',
    quantity: 75,
    orderId: '#INV10004'
  }
]

const Delivery: React.FC = () => {
  const { message } = App.useApp()
  const [value, setValue] = useState<OptionType[]>([])
  const [dataSource, setDataSource] = useState<DataType[]>([])
  const [dataSourceLoading, setDataSourceLoading] = useState(false)
  const carriers = [
    { value: 'Viettel Post' },
    { value: 'Giaohangnhanh' },
    { value: 'Giao hàng tiết kiệm' },
    { value: 'Việt Nam Post HN' },
    { value: 'Tự Vận Chuyển' },
    { value: 'Ahamove' },
    { value: 'Việt Nam Post HCM' },
    { value: 'Việt Nam Post' },
    { value: 'JT Express' },
    { value: 'EMS' },
    { value: 'Best Express' },
    { value: 'Ninja Van' },
    { value: 'SuperShip' },
    { value: 'SPX Express' },
    { value: 'Lazada Express' },
    { value: 'Grab Express' },
    { value: 'Tiki Express' },
    { value: 'Giao hàng tiêu chuẩn' }
  ]
  const fetchUserList = async (username: string): Promise<OptionType[]> => {
    console.log('fetching user', username)
    const res = (await axiosClient.get('https://randomuser.me/api/?results=5')) as any

    return res.results.map((user: { name: { first: string; last: string }; login: { username: string } }) => ({
      label: `${user.name.first} ${user.name.last}`,
      value: user.login.username
    }))
  }
  const handleChangeData = (newValue: OptionType[]) => {
    setValue(newValue)
    setDataSourceLoading(true)
    setTimeout(() => {
      setDataSourceLoading(false)
      if (newValue.length === 0) {
        setDataSource([])
      } else {
        setDataSource(data)
      }
    }, 2000)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }

  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Giao hàng</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Form
                name='delivery'
                labelCol={{ span: 8 }}
                labelAlign='left'
                wrapperCol={{ span: 16 }}
                style={{ width: '100%' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
              >
                <Form.Item<DeliveryFieldType>
                  label='Mã đơn hàng'
                  name='orderId'
                  rules={[{ required: true, message: 'Vui lòng chọn mã đơn hàng!' }]}
                >
                  <DebounceSelect
                    mode='tags'
                    value={value}
                    placeholder='Chọn 1 hay nhiều đơn hàng'
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => handleChangeData(newValue as OptionType[])}
                    size='large'
                    tokenSeparators={[',']}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Table
                    columns={columns}
                    loading={dataSourceLoading}
                    dataSource={dataSource}
                    pagination={false}
                    bordered
                    summary={(pageData) => {
                      let totalQuantity = 0
                      let totalOrder = 0
                      pageData.forEach(({ quantity }) => {
                        totalQuantity += quantity
                        totalOrder += 1
                      })

                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={1} align='right'>
                              <Text strong>Tổng số sản phẩm</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} align='center'>
                              <Text strong>{formatCurrencyVNDToString(totalQuantity)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={1} align='right'>
                              <Text strong>Tổng đơn hàng</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} align='center'>
                              <Text strong>{formatCurrencyVNDToString(totalOrder)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      )
                    }}
                  />
                </Form.Item>

                <Form.Item<DeliveryFieldType>
                  name='deliveryBy'
                  label='Hãng vận chuyển'
                  rules={[{ required: true, message: 'Vui lòng chọn hãng vận chuyển!' }]}
                >
                  <Select placeholder='Chọn hãng vẫn chuyển' options={carriers} size='large' />
                </Form.Item>
                <Form.Item<DeliveryFieldType>
                  label='Mã vận chuyển'
                  name='trackingId'
                  rules={[{ required: true, message: 'Vui lòng nhập mã vận chuyển!' }]}
                >
                  <Input size='large' placeholder='Vui lòng nhập mã vận chuyển' />
                </Form.Item>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' htmlType='submit' className='w-full' size='large'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default Delivery

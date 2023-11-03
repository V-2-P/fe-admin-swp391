import React, { useEffect, useState } from 'react'
import { Space, Typography, Row, Col, Card, App, Form, Button, Input, Table } from 'antd'
import axiosClient from '~/utils/api/AxiosClient'
import DebounceSelect, { OptionType } from '~/application/components/shared/DebounceSelect'
import { DeliveryFieldType } from '~/application/components/delivery/type'
import type { ColumnsType } from 'antd/es/table'
import { formatCurrencyVND } from '~/utils/numberUtils'
import { useNavigate, useParams } from 'react-router-dom'
import { Order, OrderDetail, getOrderByIdAPI, updateOrderShippingStatusAPI } from '~/utils/api'
import { reFetchData } from '~/redux/slices'
import { useAppDispatch } from '~/application/hooks/reduxHook'

const { Title, Text } = Typography

const columns: ColumnsType<OrderDetail> = [
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

const Delivery: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message, notification } = App.useApp()
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Order>()
  const [dataSourceLoading, setDataSourceLoading] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const [form] = Form.useForm<DeliveryFieldType>()

  const fetchUserList = async (username: string): Promise<OptionType[]> => {
    console.log('fetching user', username)
    const res = (await axiosClient.get('https://randomuser.me/api/?results=5')) as any

    return res.results.map((user: { name: { first: string; last: string }; login: { username: string } }) => ({
      label: `${user.name.first} ${user.name.last}`,
      value: user.login.username
    }))
  }
  const handleChangeData = (newValue: OptionType[]) => {
    if (!newValue) {
      navigate('/delivery')
    } else {
      navigate('/delivery/' + Math.random())
    }
  }
  const onFinish = async (values: DeliveryFieldType) => {
    setIsButtonLoading(true)
    try {
      const payload = {
        trackingNumber: values.trackingId
      }
      const response = await updateOrderShippingStatusAPI(Number(id), payload)
      setIsButtonLoading(false)
      if (response) {
        notification.success({ message: `Cập nhật thành công` })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setIsButtonLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }
  useEffect(() => {
    const fetchUser = async (id: number) => {
      form.setFieldsValue({
        inputOrderId: {
          value: id.toString(),
          label: id
        }
      })
      setDataSourceLoading(true)
      const res = await getOrderByIdAPI(id)
      const data: Order = res.data

      setData(data)
      form.setFieldsValue({
        deliveryBy: data.shippingMethod,
        trackingId: data.trackingNumber
      })
      setDataSourceLoading(false)
    }
    if (id) {
      fetchUser(Number(id))
    } else {
      form.resetFields()
    }
  }, [form, id])
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
                form={form}
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
                  name='inputOrderId'
                  rules={[{ required: true, message: 'Vui lòng chọn mã đơn hàng!' }]}
                >
                  <DebounceSelect
                    showSearch
                    placeholder='Chọn mã đơn hàng'
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
                    dataSource={data ? data.orderDetails : []}
                    pagination={false}
                    bordered
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
                </Form.Item>

                <Form.Item<DeliveryFieldType> name='deliveryBy' label='Phương thức vận chuyển'>
                  <Input size='large' disabled placeholder='Vui lòng chọn phương thức vận chuyển' />
                </Form.Item>
                <Form.Item<DeliveryFieldType>
                  label='Mã vận chuyển'
                  name='trackingId'
                  rules={[{ required: true, message: 'Vui lòng nhập mã vận chuyển!' }]}
                >
                  <Input size='large' placeholder='Vui lòng nhập mã vận chuyển' />
                </Form.Item>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button loading={isButtonLoading} type='primary' htmlType='submit' className='w-full' size='large'>
                    Xác nhận
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

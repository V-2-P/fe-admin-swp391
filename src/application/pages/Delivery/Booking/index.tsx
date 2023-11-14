import { App, Button, Card, Col, Descriptions, Form, Input, List, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { Booking, getBookingByIdAPI, updateBookingStatusAPI } from '~/utils/api/booking'
// import { formatCurrencyVND } from '~/utils/numberUtils'
const { Title } = Typography

const BookingDelivery: React.FC = () => {
  const { id } = useParams()
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Booking>()
  const [form] = Form.useForm()
  const onFinish = async () => {
    try {
      const response = await updateBookingStatusAPI(Number(id), 'Shipping')
      if (response) {
        notification.success({ message: `Cập nhật thành công` })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  useEffect(() => {
    const fetchUser = async (id: number) => {
      const res = await getBookingByIdAPI(id)
      const data: Booking = res.data
      if (data) {
        setData(data)
      }
      console.log(data)
    }
    if (id) {
      fetchUser(Number(id))
    }
  }, [data, id])
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
                autoComplete='off'
              >
                <List itemLayout='horizontal'>
                  <List.Item>
                    <List.Item.Meta
                      title={<Typography.Title level={5}>{'Chim bố'}</Typography.Title>}
                      description={
                        <Descriptions
                          items={[
                            {
                              key: '1',
                              label: 'Tên',
                              children: data?.bookingDetail.fatherBird.name
                            },
                            {
                              key: '2',
                              label: 'Tuổi',
                              children: data?.bookingDetail.fatherBird.age
                            },
                            {
                              key: '3',
                              label: 'Màu',
                              children: data?.bookingDetail.fatherBird.color
                            },
                            {
                              key: '4',
                              label: 'Độ thuần chủng',
                              children: data?.bookingDetail.fatherBird.purebredLevel
                            }
                          ]}
                          column={4}
                        />
                      }
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={<Typography.Title level={5}>{'Chim mẹ'}</Typography.Title>}
                      description={
                        <Descriptions
                          items={[
                            {
                              key: '1',
                              label: 'Tên',
                              children: data?.bookingDetail.motherBird.name
                            },
                            {
                              key: '2',
                              label: 'Tuổi',
                              children: data?.bookingDetail.motherBird.age
                            },
                            {
                              key: '3',
                              label: 'Màu',
                              children: data?.bookingDetail.motherBird.color
                            },
                            {
                              key: '4',
                              label: 'Độ thuần chủng',
                              children: data?.bookingDetail.motherBird.purebredLevel
                            }
                          ]}
                          column={4}
                        />
                      }
                    />
                  </List.Item>
                </List>
                <List
                  dataSource={data?.bookingDetail.birdPairing}
                  itemLayout='horizontal'
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<Typography.Title level={5}>{'Danh sách chim con'}</Typography.Title>}
                        description={
                          <Descriptions
                            items={[
                              {
                                key: '1',
                                label: 'Tên',
                                children: item.newBird.name
                              },
                              {
                                key: '2',
                                label: 'Màu',
                                children: item.newBird.color
                              },
                              {
                                key: '3',
                                label: 'Giới tính',
                                children: item.newBird.gender
                              }
                            ]}
                            column={4}
                          />
                        }
                      />
                    </List.Item>
                  )}
                />

                <Form.Item name='trackingNumber' label='Mã vận chuyển'>
                  <Input size='large' placeholder='Vui lòng nhập mã vận chuyển' />
                </Form.Item>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' htmlType='submit' className='w-full' size='large'>
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

export default BookingDelivery

import { App, Button, Card, Col, Form, Input, InputNumber, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import DeleteButton from '~/application/components/shared/DeleteButton'
import UpdateShipmentForm from '~/application/components/shipmentList/updateShipmentForm'
import useFetchData from '~/application/hooks/useFetchData'
import { addShipmentAPI, deleteShipmentAPI } from '~/utils/api'
import { formatCurrencyVND, formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'

const { Title } = Typography

interface ShipmentMethod {
  createdAt: string
  updatedAt: string
  id: number
  name: string
  shippingMoney: number
}

const ShipmentList: React.FC = () => {
  const [loading, error, response] = useFetchData(`/shippingmethod`)
  const [data, setData] = useState<ShipmentMethod[]>([])
  const { notification, message } = App.useApp()
  const [addLoading, setAddLoading] = useState(false)
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    setAddLoading(true)
    const payload = {
      name: values.name,
      shippingMoney: values.price
    }

    try {
      const response = await addShipmentAPI(payload)
      setAddLoading(false)
      if (response) {
        notification.success({ message: 'Thêm hãng vận chuyển thành công' })
        form.resetFields()
        setData((prevData) => [response.data, ...prevData])
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setAddLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }

  const handleDelete = async (id: number) => {
    const response = await deleteShipmentAPI(id)
    if (response) {
      setData((prevData) => prevData.filter((bird) => bird.id !== id))
      notification.success({ message: 'Xóa vận chuyển thành công' })
    } else {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const columns: ColumnsType<ShipmentMethod> = [
    {
      title: 'Tên',
      dataIndex: 'name',
      align: 'right'
    },
    {
      title: 'Giá tiền',
      dataIndex: 'shippingMoney',
      align: 'right',
      render: (_, { shippingMoney }) => formatCurrencyVND(shippingMoney)
    },
    {
      dataIndex: 'action',
      render: (_, record) => <DeleteButton onDelete={() => handleDelete(record.id)} />
    }
  ]
  useEffect(() => {
    if (!loading && !error && response) {
      setData(response.data)
    }
  }, [loading, error, response])
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách vận chuyển</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Form
                name='addShipment'
                labelCol={{ span: 8 }}
                labelAlign='left'
                wrapperCol={{ span: 16 }}
                style={{ width: '100%' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                form={form}
              >
                <Form.Item
                  label='Phương thức vận chuyển'
                  name='name'
                  rules={[{ required: true, message: 'Vui lòng nhập phương thức vận chuyển!' }]}
                >
                  <Input size='large' placeholder='Vui lòng nhập phương thức vận chuyển' />
                </Form.Item>
                <Form.Item
                  label='Giá tiền'
                  name='price'
                  rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                >
                  <InputNumber
                    min={10000}
                    formatter={(value: number | undefined) => formatCurrencyVNDToString(value)}
                    parser={(value: string | undefined) => parseCurrencyVNDToNumber(value)}
                    addonAfter='vnđ'
                    className='!w-full'
                    size='large'
                    placeholder='Giá tiền'
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' loading={addLoading} htmlType='submit' className='w-full' size='large'>
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Table
                rowKey={'id'}
                style={{ minHeight: 800 }}
                // scroll={{ x: 800, y: 1200 }}
                pagination={false}
                columns={columns}
                dataSource={data}
                rowClassName='cursor-pointer'
                expandable={{
                  columnWidth: 0,
                  expandIcon: () => <></>,
                  expandRowByClick: true,
                  expandedRowRender: (record) => <UpdateShipmentForm shipment={record} />
                }}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}
export default ShipmentList

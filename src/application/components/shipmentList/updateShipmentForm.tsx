import { Form, Row, Col, Input, Button, InputNumber, App, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { deleteShipmentAPI, updateShipmentAPI } from '~/utils/api'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'

interface Shipment {
  id: number
  name: string
  shippingMoney: number
}

type UpdateShipmentFormProps = {
  shipment: Shipment
}

const UpdateShipmentForm: React.FC<UpdateShipmentFormProps> = ({ shipment }) => {
  const [form] = Form.useForm<Shipment>()
  const [loading, setLoading] = useState(false)
  const { notification, message } = App.useApp()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showPopconfirm = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    setConfirmLoading(true)

    try {
      const response = await deleteShipmentAPI(shipment.id)
      setOpen(false)
      setConfirmLoading(false)
      if (response) {
        notification.success({ message: 'Cập nhật vận chuyển thành công' })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setOpen(false)
      setConfirmLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const onFinish = async (values: Shipment) => {
    setLoading(true)

    const payload = {
      name: values.name,
      shippingMoney: values.shippingMoney
    }

    console.log(payload)
    try {
      const response = await updateShipmentAPI(shipment.id, payload)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Sửa phương thức vận chuyển thành công' })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }
  return (
    <Form
      name={`updateShipment-${shipment.id}`}
      labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{
        ...(shipment.id && { id: shipment.id }),
        ...(shipment.name && { name: shipment.name }),
        ...(shipment.shippingMoney && { shippingMoney: shipment.shippingMoney })
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      form={form}
    >
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item
            label='Phương thức vận chuyển'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập phương thức vận chuyển!' }]}
          >
            <Input size='large' placeholder='Vui lòng nhập phương thức vận chuyển' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='Giá tiền'
            name='shippingMoney'
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
        </Col>
      </Row>

      <Form.Item>
        <div className='w-full flex flex-row-reverse gap-5'>
          <Popconfirm
            title='Xóa voucher'
            description='Bạn có muốn xóa voucher'
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button onClick={showPopconfirm} type='primary' danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button loading={loading} type='primary' htmlType='submit'>
            Sửa đổi
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default UpdateShipmentForm

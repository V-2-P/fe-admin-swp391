import { Form, Row, Col, Input, Button, DatePicker, InputNumber, App, Popconfirm } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { UpdateVoucherPayload, deleteVoucherAPI, updateVoucherAPI } from '~/utils/api'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'

interface Voucher {
  createdAt: Date | Dayjs
  updatedAt: Date | Dayjs
  id: number
  discount: number
  name: string
  amount: number
  minValue: number
  code: string
  description: string
  startDate: Date | Dayjs
  expirationDate: Date | Dayjs
}

type UpdateVoucherFormProps = {
  voucher: Voucher
}

const UpdateVoucherForm: React.FC<UpdateVoucherFormProps> = ({ voucher }) => {
  const [form] = Form.useForm<Voucher>()
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
      const response = await deleteVoucherAPI(voucher.id)
      setOpen(false)
      setConfirmLoading(false)
      if (response) {
        notification.success({ message: 'Xóa voucher thành công' })
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

  const onFinish = async (values: Voucher) => {
    setLoading(true)
    const expirationDate = values.expirationDate as Dayjs
    const startDate = values.startDate as Dayjs
    const payload: UpdateVoucherPayload = {
      discount: values.discount,
      name: values.name,
      ...(values.description && { description: values.description }),
      amount: values.amount,
      code: values.code,
      expirationDate: expirationDate.format('YYYY-MM-DDTHH:mm:ss') as string,
      startDate: startDate.format('YYYY-MM-DDTHH:mm:ss') as string,
      minValue: values.minValue
    }

    console.log(payload)
    try {
      const response = await updateVoucherAPI(voucher.id, payload)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Sửa voucher thành công' })
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
      name={`updateVoucher-${voucher.id}`}
      labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{
        ...(voucher.id && { id: voucher.id }),
        ...(voucher.minValue && { minValue: voucher.minValue }),
        ...(voucher.amount && { amount: voucher.amount }),
        ...(voucher.discount && { discount: voucher.discount }),
        ...(voucher.code && { code: voucher.code }),
        ...(voucher.name && { name: voucher.name }),
        ...(voucher.description && { description: voucher.description }),
        startDate: voucher.startDate ? dayjs(voucher.startDate) : null,
        createdAt: voucher.createdAt ? dayjs(voucher.createdAt) : null,
        expirationDate: voucher.expirationDate ? dayjs(voucher.expirationDate) : null
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      form={form}
    >
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Mã voucher'
            name='code'
            rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}
          >
            <Input placeholder='Mã voucher' size='large' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Tên voucher'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}
          >
            <Input placeholder='Tên voucher' size='large' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Ngày sử dụng'
            name='startDate'
            rules={[{ required: true, message: 'Vui lòng nhập ngày sử dụng!' }]}
          >
            <DatePicker
              size='large'
              format={'DD-MM-YYYY'}
              placeholder='Vui lòng nhập ngày hết hạn'
              className='w-full'
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Ngày hết hạn'
            name='expirationDate'
            rules={[{ required: true, message: 'Vui lòng nhập ngày hết hạn!' }]}
          >
            <DatePicker
              size='large'
              format={'DD-MM-YYYY'}
              placeholder='Vui lòng nhập ngày hết hạn'
              className='w-full'
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Ngày phát hành'
            name='createdAt'
            rules={[{ required: true, message: 'Vui lòng nhập ngày phát hành!' }]}
          >
            <DatePicker
              size='large'
              format={'DD-MM-YYYY'}
              placeholder='Vui lòng nhập ngày phát hành'
              className='w-full'
              disabled
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<Voucher>
            label='Đơn hàng tối thiểu'
            name='minValue'
            rules={[{ required: true, message: 'Vui lòng nhập giá giá trị tối thiểu' }]}
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
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Số lượng'
            name='amount'
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <InputNumber
              min={1}
              formatter={(value: number | undefined) => formatCurrencyVNDToString(value)}
              parser={(value: string | undefined) => parseCurrencyVNDToNumber(value)}
              className='!w-full'
              size='large'
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<Voucher>
            label='Mệnh giá'
            name='discount'
            rules={[{ required: true, message: 'Vui lòng nhập giá discount' }]}
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
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item<Voucher> label='Mô tả' name='description'>
            <Input.TextArea placeholder='Mô tả voucher' showCount maxLength={300} autoSize={{ minRows: 5 }} />
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

export default UpdateVoucherForm

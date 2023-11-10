import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, message, notification } from 'antd'
import { Dayjs } from 'dayjs'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'
import { useState } from 'react'
import { VoucherPayload, addVoucherAPI } from '~/utils/api'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { PlusOutlined } from '@ant-design/icons'

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
const AddVoucherForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<Voucher>()
  const dispatch = useAppDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onSubmit = async (values: Voucher) => {
    setLoading(true)
    const expirationDate = values.expirationDate as Dayjs
    const startDate = values.startDate as Dayjs
    const payload: VoucherPayload = {
      discount: values.discount,
      name: values.name,
      ...(values.description && { description: values.description }),
      amount: values.amount,
      code: values.code,
      expirationDate: expirationDate.format('YYYY-MM-DDTHH:mm:ss') as string,
      startDate: startDate.format('YYYY-MM-DDTHH:mm:ss') as string,
      minValue: values.minValue
    }
    try {
      const response = await addVoucherAPI(payload)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Thêm voucher thành công' })
        form.resetFields()
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
    <div>
      <Button icon={<PlusOutlined />} shape='round' type='primary' onClick={showModal}>
        Thêm voucher
      </Button>
      <Modal footer={false} title='Thêm Voucher' width={'80%'} open={isModalOpen} onCancel={handleCancel}>
        <Form onFinish={onSubmit} onFinishFailed={onFinishFailed} autoComplete='off' form={form}>
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
              <Form.Item<Voucher> label='Mô tả' name='description'>
                <Input.TextArea placeholder='Mô tả voucher' showCount maxLength={300} autoSize={{ minRows: 5 }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <div className='w-full flex flex-row-reverse gap-5'>
              <Button icon={<PlusOutlined />} loading={loading} type='primary' htmlType='submit'>
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddVoucherForm

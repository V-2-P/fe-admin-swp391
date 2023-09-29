import React from 'react'
import { Form, Input, Select, InputNumber } from 'antd'
import { AddBirdFieldType } from './type'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'

const GeneralContainer: React.FC = () => {
  const categories = [
    { value: 'Loài chim 1' },
    { value: 'Loài chim 2' },
    { value: 'Loài chim 3' },
    { value: 'Loài chim 4' }
  ]
  const genders = [{ value: 'Đực' }, { value: 'Cái' }, { value: 'Khác' }]
  return (
    <>
      <Form.Item<AddBirdFieldType>
        label='Tên chim'
        name='name'
        rules={[{ required: true, message: 'Vui lòng nhập tên chim!' }]}
      >
        <Input size='large' placeholder='Vui lòng nhập tên chim' />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
        name='gender'
        label='Giới tính'
        rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}
      >
        <Select placeholder='Chọn giới tính' options={genders} size='large' />
      </Form.Item>

      <Form.Item<AddBirdFieldType> label='Tuổi' name='age' rules={[{ required: true, message: 'Vui lòng nhập tuổi' }]}>
        <InputNumber min={0} max={100} className='!w-full' size='large' />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
        label='Danh mục'
        name='category'
        rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
      >
        <Select placeholder='Vui lòng nhập danh mục' options={categories} size='large' />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
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
        />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
        label='Số lượng'
        name='quantity'
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

      <Form.Item label='Mô tả' name='description'>
        <Input.TextArea showCount maxLength={300} autoSize={{ minRows: 5 }} />
      </Form.Item>
    </>
  )
}

export default GeneralContainer

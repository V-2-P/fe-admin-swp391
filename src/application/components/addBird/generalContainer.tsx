import React from 'react'
import { Form, Input, Select, InputNumber, Skeleton, Result } from 'antd'
import { AddBirdPayload } from '~/utils/api/bird/types'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'
import useFetchData from '~/application/hooks/useFetchData'

interface BirdCategory {
  id: number
  name: string
}

const GeneralContainer: React.FC = () => {
  const [fetchCategoryLoading, fetchCategoryError, fetchCategoryResponse] = useFetchData(`/category`)
  const birdCategory: BirdCategory[] = fetchCategoryResponse
    ? fetchCategoryResponse.data.map((x: BirdCategory) => ({
        value: x.id,
        label: x.name
      }))
    : []

  const genders = [{ value: 'male', label: 'Đực' }, { value: 'female', label: 'Cái' }, { value: 'Khác' }]
  return (
    <Skeleton loading={fetchCategoryLoading} active>
      {fetchCategoryError ? (
        <Result title='Failed to fetch' subTitle={fetchCategoryError} status='error' />
      ) : (
        <>
          <Form.Item<AddBirdPayload>
            label='Tên chim'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên chim!' }]}
          >
            <Input size='large' placeholder='Vui lòng nhập tên chim' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
            name='gender'
            label='Giới tính'
            rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}
          >
            <Select placeholder='Chọn giới tính' options={genders} size='large' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
            label='Tuổi'
            name='age'
            rules={[{ required: true, message: 'Vui lòng nhập tuổi' }]}
          >
            <InputNumber min={0} max={100} className='!w-full' size='large' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
            label='Danh mục'
            name='categoryId'
            rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
          >
            <Select placeholder='Vui lòng nhập danh mục' options={birdCategory} size='large' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
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

          <Form.Item<AddBirdPayload>
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
      )}
    </Skeleton>
  )
}

export default GeneralContainer

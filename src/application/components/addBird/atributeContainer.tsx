import React from 'react'
import { Form, Input, InputNumber, Result, Select, Skeleton } from 'antd'

import { AddBirdPayload } from '~/utils/api/bird/types'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'
import useFetchData from '~/application/hooks/useFetchData'
export interface BirdType {
  id: number
  name: string
}
const AtributeContainer: React.FC = () => {
  const puredLevels = [
    { value: 'Thuần chủng' },
    { value: 'Hỗn huyết' },
    { value: 'Lai tạo' },
    { value: 'F1' },
    { value: 'F2' },
    { value: 'F3' },
    { value: 'Hoang dã' },
    { value: 'Nhân giống' }
  ]
  const [fetchBirdTypeLoading, fetchBirdTypeError, fetchBirdTypeResponse] = useFetchData(`/birdtype`)
  const birdTypes: BirdType[] = fetchBirdTypeResponse
    ? fetchBirdTypeResponse.data.map((x: BirdType) => ({
        value: x.id,
        label: x.name
      }))
    : []
  return (
    <Skeleton loading={fetchBirdTypeLoading} active>
      {fetchBirdTypeError ? (
        <Result title='Failed to fetch' subTitle={fetchBirdTypeError} status='error' />
      ) : (
        <>
          <Form.Item<AddBirdPayload>
            label='Màu lông'
            name='color'
            rules={[{ required: true, message: 'Vui lòng nhập màu lông!' }]}
          >
            <Input size='large' placeholder='Vui lòng nhập màu lông' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
            label='Loài chim'
            name='typeId'
            rules={[{ required: true, message: 'Vui lòng nhập loài chim!' }]}
          >
            <Select placeholder='Vui lòng nhập loài chim' options={birdTypes} size='large' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
            label='Độ thuần chủng'
            name='purebredLevel'
            rules={[{ required: true, message: 'Vui lòng chọn độ thuần chủng!' }]}
          >
            <Select placeholder='Chọn độ thuần chủng' style={{ width: '100%' }} options={puredLevels} size='large' />
          </Form.Item>

          <Form.Item<AddBirdPayload>
            label='Thành tích'
            name='competitionAchievements'
            rules={[{ required: true, message: 'Vui lòng nhập thành tích!' }]}
          >
            <InputNumber
              min={0}
              formatter={(value: number | undefined) => formatCurrencyVNDToString(value)}
              parser={(value: string | undefined) => parseCurrencyVNDToNumber(value)}
              className='!w-full'
              size='large'
            />
          </Form.Item>
        </>
      )}
    </Skeleton>
  )
}

export default AtributeContainer

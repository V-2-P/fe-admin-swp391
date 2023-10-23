import React from 'react'
import { Form, InputNumber, Result, Select, Skeleton } from 'antd'

import { AddBirdPayload } from '~/utils/api/bird/types'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'
import useFetchData from '~/application/hooks/useFetchData'
interface BirdType {
  id: number
  name: string
}
const AtributeContainer: React.FC = () => {
  const colors = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]
  const puredLevels = [{ value: 'Thuần chủng' }, { value: 'Không thuần chuẩn' }]
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
            <Select placeholder='Chọn màu lông' style={{ width: '100%' }} options={colors} size='large' />
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

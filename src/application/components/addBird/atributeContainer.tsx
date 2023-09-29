import React from 'react'
import { Form, InputNumber, Select } from 'antd'

import { AddBirdFieldType } from './type'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'

const AtributeContainer: React.FC = () => {
  const colors = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]
  const puredLevels = [{ value: 'Thuần chủng' }, { value: 'Không thuần chuẩn' }]
  const birdTypes = [
    { value: 'Chủng loài 1' },
    { value: 'Chủng loài 2' },
    { value: 'Chủng loài 3' },
    { value: 'Chủng loài 4' }
    // Thêm các đối tượng khác tại đây tương ứng với các chủng loại khác
  ]
  return (
    <>
      <Form.Item<AddBirdFieldType>
        label='Màu lông'
        name='color'
        rules={[{ required: true, message: 'Vui lòng nhập màu lông!' }]}
      >
        <Select placeholder='Chọn màu lông' style={{ width: '100%' }} options={colors} size='large' />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
        label='Chủng loại'
        name='birdType'
        rules={[{ required: true, message: 'Vui lòng nhập chủng loại!' }]}
      >
        <Select placeholder='Chọn chủng loại' style={{ width: '100%' }} options={birdTypes} size='large' />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
        label='Độ thuần chủng'
        name='puredLevel'
        rules={[{ required: true, message: 'Vui lòng chọn độ thuần chủng!' }]}
      >
        <Select placeholder='Chọn độ thuần chủng' style={{ width: '100%' }} options={puredLevels} size='large' />
      </Form.Item>

      <Form.Item<AddBirdFieldType>
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
  )
}

export default AtributeContainer

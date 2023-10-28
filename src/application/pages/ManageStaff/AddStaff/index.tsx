import React from 'react'
import { Typography, Row, Col, Card, Space } from 'antd'
import CreateUserForm from '~/application/components/shared/CreateUserForm'

const { Title } = Typography

const AddStaff: React.FC = () => {
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Thêm nhân viên</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <CreateUserForm createRole='nhân viên' />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default AddStaff

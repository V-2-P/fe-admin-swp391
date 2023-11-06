import React from 'react'
import { Space, Typography, Row, Col, Tabs } from 'antd'
import FeedbackOrderTab from '~/application/components/feedbackTab/feedbackOrderTab'
const { Title } = Typography

const FeedbackList: React.FC = () => {
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách đánh giá</Title>
        </div>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey='1' type='card'>
              <Tabs.TabPane tab='Order' key='1'>
                <FeedbackOrderTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Booking' key='2'>
                Booking
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default FeedbackList

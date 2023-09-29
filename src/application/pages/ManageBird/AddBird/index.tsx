import React from 'react'
import { Typography, Row, Col, Card, Tabs, Form, Button, App } from 'antd'
import { SettingOutlined, FileImageOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import GeneralContainer from '~/application/components/addBird/generalContainer'
import ImageContainer from '~/application/components/addBird/imageContainter'
import AtributeContainer from '~/application/components/addBird/atributeContainer'

const { Title } = Typography

const AddBird: React.FC = () => {
  const { message } = App.useApp()
  const items: TabsProps['items'] = [
    {
      forceRender: true,
      label: (
        <span>
          <SettingOutlined />
          Tổng quan
        </span>
      ),
      key: '1',
      children: <GeneralContainer />
    },
    {
      forceRender: true,
      label: (
        <span>
          <FileImageOutlined />
          Hình ảnh
        </span>
      ),
      key: '2',
      children: <ImageContainer />
    },
    {
      forceRender: true,
      label: (
        <span>
          <UnorderedListOutlined />
          Thuộc tính
        </span>
      ),
      key: '3',
      children: <AtributeContainer />
    }
  ]
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <div className='flex flex-row justify-between items-center'>
        <Title level={3}>Thêm Chim</Title>
      </div>
      <Row>
        <Col span={24}>
          <Card bordered={false}>
            <Form
              initialValues={{ age: 0, competitionAchievements: 0, quantity: 1 }}
              name='basic'
              labelCol={{ span: 8 }}
              labelAlign='left'
              wrapperCol={{ span: 16 }}
              style={{ width: '100%' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Tabs
                size='large'
                tabBarStyle={{ userSelect: 'none' }}
                tabBarGutter={50}
                indicatorSize={125}
                defaultActiveKey='1'
                items={items}
              />
              <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                <Button type='primary' htmlType='submit' className='w-full' size='large'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AddBird

import React, { useState } from 'react'
import { Typography, Row, Col, Card, Tabs, Form, Button, App, Space } from 'antd'
import { SettingOutlined, FileImageOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import GeneralContainer from '~/application/components/addBird/generalContainer'
import ImageContainer from '~/application/components/addBird/imageContainter'
import AtributeContainer from '~/application/components/addBird/atributeContainer'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { addBirdAPI, AddBirdPayload } from '~/utils/api'

const { Title } = Typography

const AddBird: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()
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
  const onFinish = async (values: AddBirdPayload) => {
    setLoading(true)
    const payload: AddBirdPayload = {
      name: values.name,
      price: values.price,
      description: values.description,
      categoryId: values.categoryId,
      typeId: values.typeId,
      status: true,
      purebredLevel: values.purebredLevel,
      competitionAchievements: values.competitionAchievements,
      age: values.age,
      quantity: values.quantity,
      gender: values.gender,
      color: values.color,

      imageThumbnail: values.imageThumbnail,
      imagesFile: values.imagesFile
    }

    try {
      const response = await addBirdAPI(payload)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Thêm chim thành công' })
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
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Thêm Chim</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Form
                initialValues={{ age: 0, competitionAchievements: 0, quantity: 1 }}
                name='addbird'
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
                  <Button type='primary' loading={loading} htmlType='submit' className='w-full' size='large'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default AddBird

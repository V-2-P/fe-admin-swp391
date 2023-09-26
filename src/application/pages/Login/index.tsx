import React from 'react'
import { Form, Input, Button, Typography, Divider, Space, Image } from 'antd'
import { UserOutlined, LockOutlined, FacebookFilled, GoogleSquareFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { Title } = Typography

interface Values {
  username: string
  password: string
}

const LoginPage: React.FC = () => {
  const onFinish = (values: Values) => {
    console.log('Received values of form: ', values)
  }

  return (
    <section className='h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
      <div className='md:w-1/3 max-w-sm'>
        <Image
          src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
          alt='Bird Farm Shop'
          preview={false}
        />
      </div>
      <div className='md:w-1/3 max-w-sm'>
        <div className='flex items-center justify-center'>
          <Title level={2}>Bird Farm Shop</Title>
        </div>

        <Form name='login_form' onFinish={onFinish}>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder='Username' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined />} type='password' placeholder='Password' />

            <Link className='float-right mt-2' to='https://ant.design'>
              Forgot password
            </Link>
          </Form.Item>

          <Divider plain>or</Divider>
          <Form.Item>
            <div className='flex items-center justify-center'>
              <Space align='center' size={24}>
                <Button shape='circle' size='large' icon={<FacebookFilled className='cursor-pointer' />}></Button>
                <Button shape='circle' size='large' icon={<GoogleSquareFilled className='cursor-pointer' />}></Button>
              </Space>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}

export default LoginPage

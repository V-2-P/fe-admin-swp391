import React from 'react'
import { Form, Input, Button, Typography, Divider, Space, Image, App } from 'antd'
import { UserOutlined, LockOutlined, FacebookFilled, GoogleSquareFilled } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/application/hooks/reduxHook'
import { loginAsync } from '~/redux/slices/accountSlice'
import { LoginPayload } from '~/utils/api'
const { Title } = Typography

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()
  const { isLoading } = useAppSelector((state) => state.account)
  const onFinish = async (values: LoginPayload) => {
    try {
      const payload: LoginPayload = {
        email: values.email,
        password: values.password
      }
      await dispatch(loginAsync(payload)).unwrap()
      form.resetFields()
      notification.success({ message: `Chào mừng bạn đến với BFS` })
      navigate('/dashboard')
    } catch (err) {
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
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

        <Form name='login_form' form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item<LoginPayload> name='email' rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder='Email' />
          </Form.Item>
          <Form.Item<LoginPayload> name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
          </Form.Item>

          <Link className='float-right mt-2' to='https://ant.design'>
            Forgot password
          </Link>
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
            <Button type='primary' loading={isLoading} htmlType='submit' block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}

export default LoginPage

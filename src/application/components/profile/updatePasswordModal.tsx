import { Modal, Form, Input, Button, notification } from 'antd'
import React, { useState } from 'react'
import { updateProfileAPI } from '~/utils/api'

const UpdatePasswordModal: React.FC = () => {
  const [modal, setModal] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const onUpdatePassword = async (values: any) => {
    setLoading(true)
    const payload = {
      currentPassword: values.currentPassword,
      password: values.password,
      confirmedPassword: values.confirmedPassword
    }
    try {
      const res = await updateProfileAPI(payload)
      setLoading(false)
      if (res) {
        notification.success({ message: 'Đổi mật khẩu thành công' })
      } else {
        notification.success({ message: 'Đổi mật khẩu thất bại' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  return (
    <>
      <Button
        style={{ marginTop: '10px', marginRight: '20px' }}
        shape='default'
        type='primary'
        size='large'
        onClick={() => setModal(true)}
      >
        Đổi mật khẩu
      </Button>
      <Modal
        footer={null}
        title='Đổi mật khẩu'
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <Form
          onFinish={onUpdatePassword}
          form={form}
          name='dependencies'
          autoComplete='off'
          style={{ maxWidth: 600 }}
          layout='vertical'
        >
          <Form.Item
            label='Mật khẩu cũ'
            name='currentPassword'
            rules={[{ required: true, message: 'Điền mật khẩu cũ' }]}
          >
            <Input type='password' />
          </Form.Item>

          <Form.Item label='Mật khẩu mới' name='password' rules={[{ required: true, message: 'Điền mật khẩu mới' }]}>
            <Input type='password' />
          </Form.Item>

          {/* Field */}
          <Form.Item
            label='Xác nhận mật khẩu'
            name='confirmedPassword'
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Xác nhận mật khẩu'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng'))
                }
              })
            ]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 100 }}>
            <Button type='primary' loading={loading} htmlType='submit' className='!w-full'>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UpdatePasswordModal

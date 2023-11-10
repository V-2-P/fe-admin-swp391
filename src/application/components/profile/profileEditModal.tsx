import { Form, App, Modal, Input, Button, Skeleton, DatePicker } from 'antd'
import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { UpdateProfilePayload, User, getProfileAPI, updateProfileAPI } from '~/utils/api'
import dayjs, { Dayjs } from 'dayjs'

const ProfileEditModal: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [editProfileModal, setEditProfileModal] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { notification } = App.useApp()

  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()

    setLoading(true)
    const res = await getProfileAPI()
    console.log(res)
    const user: User = res.data
    form.setFieldsValue({
      fullName: user.fullName,
      dob: dayjs(user.dob),
      address: user.address,
      phoneNumber: user.phoneNumber
    })
    setLoading(false)
    setEditProfileModal(true)
  }

  // function to handle edit user profile
  const onFinish = async (values: any) => {
    setConfirmLoading(true)
    const dayjs = values.dob as Dayjs
    values.dob = dayjs.format('YYYY-MM-DD') as string
    try {
      const response = await updateProfileAPI(values)
      setConfirmLoading(false)
      if (response) {
        notification.success({ message: `Cập nhật thông tin thành công` })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setConfirmLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  return (
    <>
      <Button
        onClick={showModal}
        style={{ marginTop: '10px', marginRight: '20px' }}
        shape='default'
        type='primary'
        size='large'
      >
        Cập nhật thông tin
      </Button>
      <Modal
        title='Cập nhật thông tin cá nhân'
        open={editProfileModal}
        style={{ top: 20 }}
        onOk={() => setEditProfileModal(false)}
        onCancel={() => setEditProfileModal(false)}
        footer={[]}
        width={800}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Form form={form} name='updateProfile' onFinish={onFinish} layout='vertical'>
            <Form.Item<UpdateProfilePayload>
              label='Tên'
              name='fullName'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên!'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder='Tên của bạn' size='large' type='text' allowClear />
            </Form.Item>

            <Form.Item<UpdateProfilePayload>
              label='Phone'
              name='phoneNumber'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại'
                }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder='Số điện thoại' size='large' type='text' allowClear />
            </Form.Item>

            <Form.Item<UpdateProfilePayload>
              label='Ngày sinh'
              name='dob'
              rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
            >
              <DatePicker size='large' format={'DD-MM-YYYY'} placeholder='Vui lòng nhập ngày sinh' className='w-full' />
            </Form.Item>

            <Form.Item<UpdateProfilePayload>
              className='w-full'
              label='Địa chỉ'
              name='address'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ'
                }
              ]}
            >
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder='Địa chỉ của bạn'
                size='large'
                type='text'
                allowClear
              />
            </Form.Item>

            <Form.Item className='w-full'>
              <Button className='mt-4 ' htmlType='submit' type='primary' size='large' loading={confirmLoading}>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Skeleton>
      </Modal>
    </>
  )
}

export default ProfileEditModal

import { App, Button, DatePicker, Form, Input, Select } from 'antd'
import { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { AddUserPayload, ROLE, addUserAPI } from '~/utils/api'

type CreateUserFormTypes = {
  createRole?: 'nhân viên' | 'quản lý' | 'tài khoản'
}

const CreateUserForm: React.FC<CreateUserFormTypes> = ({ createRole }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()
  const roles = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Manager' },
    { value: '3', label: 'Staff' },
    { value: '4', label: 'Customer' }
  ]
  const onFinish = async (values: AddUserPayload) => {
    setLoading(true)
    const dayjs = values.dob as Dayjs
    values.dob = dayjs.format('YYYY-MM-DD') as string
    if (createRole === 'nhân viên') {
      values.roleId = ROLE.STAFF.toString()
    } else if (createRole === 'quản lý') {
      values.roleId = ROLE.MANAGER.toString()
    }
    try {
      const response = await addUserAPI(values)
      setLoading(false)
      if (response) {
        notification.success({ message: `Thêm ${createRole} thành công` })
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
    <Form
      name='adduser'
      labelCol={{ span: 8 }}
      labelAlign='left'
      wrapperCol={{ span: 16 }}
      style={{ width: '100%' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      form={form}
    >
      <Form.Item<AddUserPayload>
        label={`Tên ${createRole}`}
        name='fullName'
        rules={[{ required: true, message: `Vui lòng nhập tên ${createRole}!` }]}
      >
        <Input size='large' placeholder={`Vui lòng nhập tên ${createRole}`} />
      </Form.Item>
      <Form.Item<AddUserPayload>
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input size='large' placeholder='Vui lòng nhập email' />
      </Form.Item>
      <Form.Item<AddUserPayload>
        label='Số điện thoại'
        name='phoneNumber'
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
      >
        <Input size='large' placeholder='Vui lòng nhập số điện thoại' />
      </Form.Item>
      {createRole === 'tài khoản' && (
        <Form.Item<AddUserPayload>
          name='roleId'
          label='Vai trò'
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select placeholder='Chọn vai trò' options={roles} size='large' />
        </Form.Item>
      )}
      <Form.Item<AddUserPayload>
        label='Mật khẩu'
        name='password'
        rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
      >
        <Input.Password size='large' placeholder='Vui lòng nhập password' />
      </Form.Item>
      <Form.Item label='Ngày sinh' name='dob' rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
        <DatePicker size='large' format={'DD-MM-YYYY'} placeholder='Vui lòng nhập ngày sinh' className='w-full' />
      </Form.Item>
      <Form.Item<AddUserPayload>
        label='Địa chỉ'
        name='address'
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
      >
        <Input size='large' placeholder='Vui lòng nhập địa chỉ' />
      </Form.Item>
      <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
        <Button type='primary' loading={loading} htmlType='submit' className='w-full' size='large'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateUserForm

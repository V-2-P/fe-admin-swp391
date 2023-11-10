import React, { useEffect, useMemo, useState } from 'react'
import { Typography, Space, Row, Col, Card, Form, App, Input, Button, Skeleton, Select } from 'antd'
import DebounceSelect, { OptionType } from '~/application/components/shared/DebounceSelect'
import { UpdateStaffFieldType } from '~/application/components/updateStaff/type'
import { useParams, useNavigate } from 'react-router-dom'
import { UpdateUserPayload, getUserByIdAPI, searchUserAPI, updateUserAPI } from '~/utils/api'
import { reFetchData } from '~/redux/slices'
import { useAppDispatch } from '~/application/hooks/reduxHook'
const { Title } = Typography

type User = {
  createdAt: string
  updatedAt: string
  id: number
  fullName: string
  phoneNumber: string
  email: string
  address: string
  imageUrl: string
  roleEntity: {
    id: number
    name: string
  }
  emailVerified: boolean
  dob: string
  isActive: number
}

type Users = {
  user: User
}

type UserData = {
  users: Users[]
  totalPages: number
}

const UpdateStaff: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { message, notification } = App.useApp()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const [form] = Form.useForm<UpdateStaffFieldType>()
  const status = useMemo(
    () => [
      { value: '1', label: 'Hoạt động' },
      { value: '0', label: 'Ngừng hoạt động' },
      { value: '2', label: 'Nghỉ phép' }
    ],
    []
  )
  const fetchUserList = async (search: string): Promise<OptionType[]> => {
    console.log('fetching search', search)

    const response = await searchUserAPI(search)
    console.log(response)
    const data: UserData = response.data
    return data.users.map((element) => ({
      label: element.user.email,
      value: element.user.id
    }))
  }
  const handleChangeData = (newValue: OptionType) => {
    if (!newValue) {
      navigate('/updatestaff')
    } else {
      navigate('/updatestaff/' + newValue.value)
    }
  }

  const onFinish = async (values: UpdateStaffFieldType) => {
    setIsButtonLoading(true)
    try {
      const payload: UpdateUserPayload = {
        fullName: values.name,
        phoneNumber: values.phone,
        address: values.address,
        email: values.email,
        isActive: values.isActive?.value
      }
      const response = await updateUserAPI(Number(id), payload)
      setIsButtonLoading(false)
      if (response) {
        notification.success({ message: `Cập nhật nhân viên thành công` })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setIsButtonLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }
  useEffect(() => {
    const fetchUser = async (id: number) => {
      setIsLoading(true)
      const res = await getUserByIdAPI(id)
      const data: Users = res.data
      form.setFieldsValue({
        name: data.user.fullName,
        inputCustomerId: {
          value: data.user.id.toString(),
          label: data.user.email
        },
        phone: data.user.phoneNumber,
        email: data.user.email,
        address: data.user.address,
        isActive: {
          value: data.user.isActive.toString(),
          label: status.find((e) => e.value === data.user.isActive.toString())?.label
        }
      })
      setIsLoading(false)
      console.log(res)
    }
    if (id) {
      fetchUser(Number(id))
    } else {
      form.resetFields()
    }
  }, [form, id, status])
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Cập nhật nhân viên</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Form
                form={form}
                name='updateStaff'
                labelCol={{ span: 8 }}
                labelAlign='left'
                wrapperCol={{ span: 16 }}
                style={{ width: '100%' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
              >
                <Skeleton loading={isLoading} active>
                  <Form.Item<UpdateStaffFieldType>
                    label='Tìm kiếm nhân viên'
                    name='inputCustomerId'
                    rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
                  >
                    <DebounceSelect
                      showSearch
                      placeholder='Chọn nhân viên'
                      fetchOptions={fetchUserList}
                      onChange={(newValue) => handleChangeData(newValue as OptionType)}
                      size='large'
                      tokenSeparators={[',']}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    label='Email'
                    name='email'
                    rules={[
                      { required: true, message: 'Vui lòng nhập Email!' },
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                      }
                    ]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập Email' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    label='Tên nhân viên'
                    name='name'
                    rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập tên nhân viên' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    label='Số điện thoại'
                    name='phone'
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập số điện thoại' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    label='Địa chỉ'
                    name='address'
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập địa chỉ' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    name='isActive'
                    label='Trạng thái'
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                  >
                    <Select placeholder='Chọn trạng thái' options={status} size='large' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType> label='Facebook' name='facebook'>
                    <Input size='large' placeholder='Nhập Facebook' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType> label='Google' name='google'>
                    <Input size='large' placeholder='Nhập Goole' />
                  </Form.Item>
                </Skeleton>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' loading={isButtonLoading} htmlType='submit' className='w-full' size='large'>
                    Save
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

export default UpdateStaff

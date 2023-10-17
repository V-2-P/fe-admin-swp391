import React, { useEffect, useState } from 'react'
import { Typography, Space, Row, Col, Card, Form, App, Input, Button, Skeleton } from 'antd'
import DebounceSelect, { OptionType } from '~/application/components/shared/DebounceSelect'
import { UpdateStaffFieldType } from '~/application/components/updateStaff/type'
import axiosClient from '~/utils/api/AxiosClient'
import { useParams, useNavigate } from 'react-router-dom'
const { Title } = Typography

const UpdateStaff: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm<UpdateStaffFieldType>()
  const fetchUserList = async (customerId: string): Promise<OptionType[]> => {
    console.log('fetching customerId', customerId)
    const res = (await axiosClient.get('https://randomuser.me/api/?results=5')) as any
    return res.results.map((user: { login: { uuid: string } }) => ({
      label: user.login.uuid,
      value: user.login.uuid
    }))
  }
  const handleChangeData = (newValue: OptionType) => {
    if (!newValue) {
      navigate('/updatestaff')
    } else {
      navigate('/updatestaff/' + newValue.value)
    }
  }

  const onFinish = (values: UpdateStaffFieldType) => {
    console.log('Success:', values)
    values.customerId = values.inputCustomerId?.value
    values.inputCustomerId = undefined
    delete values.inputCustomerId
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }
  useEffect(() => {
    if (id) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        form.setFieldsValue({
          customer: 'anh vu',
          inputCustomerId: {
            value: id,
            label: id
          },
          email: 'vuthase172485@fpt.edu.vn'
        })
      }, 2000)
    } else {
      form.resetFields()
    }
  }, [form, id])
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
                    label='Mã nhân viên'
                    name='inputCustomerId'
                    rules={[{ required: true, message: 'Vui lòng chọn mã nhân viên!' }]}
                  >
                    <DebounceSelect
                      showSearch
                      placeholder='Chọn mã nhân viên'
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
                    rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập Email' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    label='Tên nhân viên'
                    name='customer'
                    rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập tên nhân viên' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType>
                    label='Địa chỉ'
                    name='address'
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                  >
                    <Input size='large' placeholder='Vui lòng nhập địa chỉ' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType> label='Facebook' name='facebook'>
                    <Input size='large' placeholder='Nhập Facebook' />
                  </Form.Item>
                  <Form.Item<UpdateStaffFieldType> label='Google' name='google'>
                    <Input size='large' placeholder='Nhập Goole' />
                  </Form.Item>
                </Skeleton>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' htmlType='submit' className='w-full' size='large'>
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

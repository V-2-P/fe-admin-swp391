import { Button, Form, Modal, App, Input, InputNumber, Select, Skeleton, Result } from 'antd'
import React, { useState } from 'react'
import { BirdDetail } from './birdDetail'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { formatCurrencyVNDToString, parseCurrencyVNDToNumber } from '~/utils/numberUtils'
import { BirdType } from '../addBird/atributeContainer'
import useFetchData from '~/application/hooks/useFetchData'
import { BirdCategory } from '../addBird/generalContainer'
import { UpdateBirdPayload, updateBirdAPI } from '~/utils/api'
import { OptionType } from '../shared/DebounceSelect'
import UpdateImageContainer from './updateImageContainer'

type BirdEditProps = {
  bird?: any
  setBird: (bird?: BirdDetail) => void
  setOpen: (open: boolean) => void
}

const BirdEdit: React.FC<BirdEditProps> = ({ bird, setBird, setOpen }) => {
  console.log(bird)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()
  const genders = [{ value: 'Trống', label: 'Trống' }, { value: 'Mái', label: 'Mái' }, { value: 'Khác' }]
  const statuss = [
    { value: true, label: 'Còn bán' },
    { value: false, label: 'Ngừng bán' }
  ]
  const [fetchBirdTypeLoading, fetchBirdTypeError, fetchBirdTypeResponse] = useFetchData(`/birdtype`)
  const birdTypes: OptionType[] = fetchBirdTypeResponse
    ? fetchBirdTypeResponse.data.map((x: BirdType) => ({
        value: x.id,
        label: x.name
      }))
    : []
  const [fetchCategoryLoading, fetchCategoryError, fetchCategoryResponse] = useFetchData(`/category`)
  const birdCategory: OptionType[] = fetchCategoryResponse
    ? fetchCategoryResponse.data.map((x: BirdCategory) => ({
        value: x.id,
        label: x.name
      }))
    : []
  const showModal = () => {
    setIsModalOpen(true)
    setOpen(false)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    setOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setOpen(false)
  }
  const onFinish = async (values: UpdateBirdPayload) => {
    setLoading(true)
    if (values.quantity) {
      values.quantity = values.quantity.toString()
    }
    if (values.competitionAchievements) {
      values.competitionAchievements = values.competitionAchievements.toString()
    }
    console.log(values)

    try {
      const response = await updateBirdAPI(bird!.id, values)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Cập chim thành công' })
        form.resetFields()
        dispatch(reFetchData())
        setIsModalOpen(false)
        setBird(response.data)
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
    <>
      <Button type='primary' onClick={showModal}>
        Edit
      </Button>
      <Modal
        title='Cập nhật chim'
        style={{ top: 20 }}
        width={1000}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          initialValues={{
            name: bird?.name,
            quantity: bird?.quantity,
            gender: bird?.gender,
            price: bird?.price,
            description: bird?.description,
            purebredLevel: bird?.purebredLevel,
            typeId: birdTypes.find((e) => e.label === bird?.birdType)?.value,
            categoryId: birdCategory.find((e) => e.label === bird?.categoryName)?.value,
            status: bird?.status,
            thumbnail: bird?.thumbnail
          }}
          name='updatebird'
          labelCol={{ span: 8 }}
          labelAlign='left'
          wrapperCol={{ span: 16 }}
          style={{ width: '100%' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          form={form}
        >
          <Skeleton active loading={fetchBirdTypeLoading && fetchCategoryLoading}>
            {fetchCategoryError || fetchBirdTypeError ? (
              <Result title='Failed to fetch' subTitle={fetchCategoryError || fetchBirdTypeError} status='error' />
            ) : (
              <>
                <Form.Item<UpdateBirdPayload>
                  label='Tên chim'
                  name='name'
                  rules={[{ required: true, message: 'Vui lòng nhập tên chim!' }]}
                >
                  <Input size='large' placeholder='Vui lòng nhập tên chim' />
                </Form.Item>
                <Form.Item<UpdateBirdPayload>
                  label='Số lượng'
                  name='quantity'
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                >
                  <InputNumber size='large' min={0} placeholder='Vui lòng nhập số lượng' className='!w-full' />
                </Form.Item>
                <Form.Item<UpdateBirdPayload>
                  name='gender'
                  label='Giới tính'
                  rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}
                >
                  <Select placeholder='Chọn giới tính' options={genders} size='large' />
                </Form.Item>
                <Form.Item<UpdateBirdPayload>
                  label='Giá tiền'
                  name='price'
                  rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                >
                  <InputNumber
                    min={10000}
                    formatter={(value: number | undefined) => formatCurrencyVNDToString(value)}
                    parser={(value: string | undefined) => parseCurrencyVNDToNumber(value)}
                    addonAfter='vnđ'
                    className='!w-full'
                    size='large'
                  />
                </Form.Item>
                <Form.Item<UpdateBirdPayload>
                  label='Độ thuần chủng'
                  name='purebredLevel'
                  rules={[{ required: true, message: 'Vui lòng chọn độ thuần chủng!' }]}
                >
                  <Input size='large' placeholder='Vui lòng nhập độ thuần chủng' />
                </Form.Item>
                <Form.Item<UpdateBirdPayload> label='Mô tả' name='description'>
                  <Input.TextArea showCount maxLength={300} autoSize={{ minRows: 5 }} />
                </Form.Item>

                <Form.Item<UpdateBirdPayload>
                  label='Loài chim'
                  name='typeId'
                  rules={[{ required: true, message: 'Vui lòng nhập loài chim!' }]}
                >
                  <Select placeholder='Vui lòng nhập loài chim' options={birdTypes} size='large' />
                </Form.Item>
                <Form.Item<UpdateBirdPayload>
                  label='Danh mục'
                  name='categoryId'
                  rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
                >
                  <Select placeholder='Vui lòng nhập danh mục' options={birdCategory} size='large' />
                </Form.Item>
                <Form.Item<UpdateBirdPayload>
                  label='Trạng thái'
                  name='status'
                  rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
                >
                  <Select placeholder='Vui lòng nhập trạng thái' options={statuss} size='large' />
                </Form.Item>
                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' loading={loading} htmlType='submit' className='w-full' size='large'>
                    Lưu
                  </Button>
                </Form.Item>
              </>
            )}
          </Skeleton>
        </Form>
        <UpdateImageContainer id={bird.id} bird={bird} setBird={setBird} />
      </Modal>
    </>
  )
}

export default BirdEdit

import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Avatar, Tag, Tooltip, Upload, App, Row, Col, Card, Skeleton, Result } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import ImgCrop from 'antd-img-crop'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { getBase64, getUserImage } from '~/utils/imageUtils'
import useFetchData from '~/application/hooks/useFetchData'
import { getRoleColor } from '~/utils/roleUtils'
import { User, uploadAvatarAPI } from '~/utils/api'
import ProfileEditModal from '~/application/components/profile/profileEditModal'

const Profile: React.FC = () => {
  const { message } = App.useApp()
  const [loading, error, response] = useFetchData(`/user/me`)
  const [data, setData] = useState<User>()
  const [imageUrl, setImageUrl] = useState<string>('error')
  const [render, setRender] = useState<boolean>(true)
  const onChangeAvatar: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info)
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url)
    })
  }
  const props: UploadProps = {
    showUploadList: false,
    onChange: onChangeAvatar,
    customRequest: async (options: any) => {
      try {
        const data = {
          imageFile: options.file
        }
        const res = await uploadAvatarAPI(data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
  useEffect(() => {
    if (!loading && !error && response) {
      setData(response.data)
      setImageUrl(getUserImage(response.data.imageUrl))
      setRender(false)
    }
  }, [loading, error, response])

  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Row>
        <Col span={24}>
          <Card bordered={false}>
            <Skeleton loading={loading && render} active>
              {error ? (
                <Result title='Failed to fetch' subTitle={error} status='error' />
              ) : (
                <Descriptions title='Profile Information' bordered extra={<ProfileEditModal />}>
                  <Descriptions.Item label='Avatar' span={3}>
                    <Avatar
                      size={100}
                      src={imageUrl}
                      icon={<UserOutlined />}
                      crossOrigin='anonymous'
                      alt='user-image'
                    />
                    {/* user avatar change */}
                    <div style={{ position: 'absolute', marginTop: '-6.5rem', marginLeft: '5rem' }}>
                      <ImgCrop
                        showGrid
                        cropShape='round'
                        rotationSlider
                        beforeCrop={(file: RcFile) => {
                          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
                          if (!isJpgOrPng) {
                            message.error('You can only upload JPG/PNG file!')
                          }
                          const isLt2M = file.size / 1024 / 1024 < 2
                          if (!isLt2M) {
                            message.error('Image must smaller than 2MB!')
                          }

                          return isJpgOrPng && isLt2M
                        }}
                      >
                        <Upload {...props}>
                          <Tooltip title='Click to change Avatar'>
                            <Button icon={<EditOutlined />} type='default' shape='circle' />
                          </Tooltip>
                        </Upload>
                      </ImgCrop>
                    </div>
                  </Descriptions.Item>

                  <Descriptions.Item label='Tên'>{data?.fullName}</Descriptions.Item>
                  <Descriptions.Item label='Vai trò' span={2}>
                    <Tag
                      style={{ width: '80px', textAlign: 'center', textTransform: 'capitalize' }}
                      color={getRoleColor(data?.roleEntity.name).color}
                    >
                      {getRoleColor(data?.roleEntity.name).name}
                    </Tag>
                  </Descriptions.Item>

                  <Descriptions.Item label='Email'>{data?.email}</Descriptions.Item>
                  <Descriptions.Item label='Số điện thoại' span={2}>
                    {data?.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label='Ngày sinh' span={3}>
                    {data?.dob}
                  </Descriptions.Item>
                  <Descriptions.Item label='Địa chỉ' span={3}>
                    {data?.address}
                  </Descriptions.Item>
                </Descriptions>
              )}
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile

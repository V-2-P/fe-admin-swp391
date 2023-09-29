import React, { useState } from 'react'
import { Button, Descriptions, Avatar, Tag, Tooltip, Upload, App, Row, Col, Card } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import ImgCrop from 'antd-img-crop'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { getBase64 } from '~/utils/imageUtils'

const Profile: React.FC = () => {
  const { message } = App.useApp()
  const [imageUrl, setImageUrl] = useState<string>('error')

  const onChangeAvatar: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info)
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url)
    })
  }
  const props: UploadProps = {
    showUploadList: false,
    onChange: onChangeAvatar,
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess!('ok')
      }, 0)
    }
  }
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Row>
        <Col span={24}>
          <Card bordered={false}>
            <Descriptions
              title='Profile Information'
              bordered
              extra={
                <Button style={{ marginTop: '10px', marginRight: '20px' }} shape='default' type='primary' size='large'>
                  Edit Profile
                </Button>
              }
            >
              <Descriptions.Item label='Avatar' span={3}>
                <Avatar size={100} src={imageUrl} icon={<UserOutlined />} crossOrigin='anonymous' alt='user-image' />
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

              <Descriptions.Item label='Tên'>{'Default First Name'}</Descriptions.Item>
              {/* <Descriptions.Item label='Last Name' span={2}>
          {'Default Last Name'}
        </Descriptions.Item> */}
              <Descriptions.Item label='Giới tính'>
                <Tag style={{ width: '80px', textAlign: 'center', textTransform: 'capitalize' }} color={'volcano'}>
                  {'UNKNOW'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Role' span={2}>
                <Tag style={{ width: '80px', textAlign: 'center', textTransform: 'capitalize' }} color={'volcano'}>
                  {'UNKNOW'}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label='Email'>{'Default email'}</Descriptions.Item>
              <Descriptions.Item label='SĐT' span={2}>
                {'Default phone'}
              </Descriptions.Item>

              <Descriptions.Item label='Address' span={3}>
                {'Default address'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile

import React, { useState } from 'react'
import { Form, Upload, App } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { AddBirdFieldType } from './type'
import { getBase64 } from '~/utils/imageUtils'

const ImageContainer: React.FC = () => {
  const { message } = App.useApp()
  const [imageUrl, setImageUrl] = useState<string>()
  const [fileImages, setFileImages] = useState<UploadFile[]>([])
  const normFile1 = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const normFile2 = (e: any) => {
    console.log('Upload event:', e)

    return e?.file
  }
  const onChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImages(newFileList)
  }
  const onChangeThumbnail: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file as RcFile, (url) => {
      setImageUrl(url)
    })
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const uploadImagesProps: UploadProps = {
    type: fileImages.length === 0 ? 'drag' : 'select',
    name: 'fileImages',
    multiple: true,
    listType: 'picture-card',
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }

      return false
    },
    fileList: fileImages,
    onChange: onChangeImages,
    onPreview: onPreview
  }
  const uploadThumbnailProps: UploadProps = {
    type: 'drag',
    name: 'fileThumbnail',
    listType: 'picture-card',
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
    },
    showUploadList: false,
    onChange: onChangeThumbnail,
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess!('ok')
      }, 0)
    }
  }

  return (
    <>
      <Form.Item<AddBirdFieldType> label='Hình ảnh'>
        <Form.Item name='images' valuePropName='fileImages' getValueFromEvent={normFile1} noStyle>
          <Upload {...uploadImagesProps}>
            {fileImages.length === 0 ? (
              <>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
              </>
            ) : (
              '+ Upload'
            )}
          </Upload>
        </Form.Item>
      </Form.Item>
      <Form.Item label='Ảnh nhỏ' name='thumbnail' rules={[{ required: true, message: 'Please select thumbnail!' }]}>
        <Form.Item<AddBirdFieldType>
          name='thumbnail'
          valuePropName='fileThumbnail'
          getValueFromEvent={normFile2}
          noStyle
        >
          <Upload {...uploadThumbnailProps}>
            {imageUrl ? (
              <img src={imageUrl} alt='thumbnail' style={{ width: '100%' }} />
            ) : (
              <>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                <p className='ant-upload-hint'>Support for a single upload.</p>
              </>
            )}
          </Upload>
        </Form.Item>
      </Form.Item>
    </>
  )
}

export default ImageContainer

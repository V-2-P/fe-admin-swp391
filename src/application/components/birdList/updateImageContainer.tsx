import React, { useState } from 'react'
import { Form, Upload, App } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { BirdImage, deleteBirdImageAPI, addBirdImageAPI } from '~/utils/api'
import { getBirdImage } from '~/utils/imageUtils'

type BirdEditProps = {
  id: number
  setBird: (bird?: any) => void
  bird?: any
}

const UpdateImageContainer: React.FC<BirdEditProps> = ({ id, bird }) => {
  const { message } = App.useApp()
  // const [imageUrl, setImageUrl] = useState<string>()
  const [fileImages, setFileImages] = useState<UploadFile[]>(
    bird.bird_images.map((e: any) => ({
      uid: e.id.toString(),
      name: e.imageUrl,
      status: 'done',
      url: getBirdImage(e.imageUrl)
    }))
  )
  const [form] = Form.useForm()
  const normFile1 = (e: any) => {
    // console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
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
  const onRemove = async (file: UploadFile) => {
    try {
      const response = await deleteBirdImageAPI(file.uid)
      if (response) {
        console.log('sucesss')
        // Tạo một bản sao của mảng birdPairings
        const oldFileImages = [...fileImages]

        // Tìm chỉ mục của phần tử có id tương ứng trong mảng
        const indexToRemove = oldFileImages.findIndex((f) => f.uid === file.uid)

        // Nếu tìm thấy phần tử, loại bỏ nó khỏi mảng
        if (indexToRemove !== -1) {
          oldFileImages.splice(indexToRemove, 1)

          // Cập nhật state với mảng đã cập nhật
          setFileImages(oldFileImages)
        }
      } else {
        console.log('1')
      }
    } catch (err) {
      // notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  const uploadImagesProps: UploadProps = {
    type: 'select',
    name: 'fileImages',
    multiple: true,
    listType: 'picture-card',
    customRequest: async (options: any) => {
      try {
        const data = {
          files: options.file
        }
        console.log(data)
        const res = await addBirdImageAPI(id, data)
        console.log(res)
        setFileImages([
          ...fileImages,
          {
            uid: res.data[0].id.toString(),
            name: res.data[0].imageUrl,
            status: 'done',
            url: getBirdImage(res.data[0].imageUrl)
          }
        ])

        options.onSuccess('Ok')
      } catch (err) {
        options.onError({ event: 'Đã có lỗi' })
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
    },
    fileList: fileImages,
    onPreview: onPreview,
    onRemove: onRemove
  }
  console.log()
  return (
    <>
      <Form form={form}>
        <Form.Item<BirdImage> label='Hình ảnh'>
          <Form.Item name='files' valuePropName='fileImages' getValueFromEvent={normFile1} noStyle>
            <Upload {...uploadImagesProps}>{'+ Upload'}</Upload>
          </Form.Item>
        </Form.Item>
      </Form>
      {/* <Form.Item
        label='Ảnh nhỏ'
        name='imageThumbnail'
        rules={[{ required: true, message: 'Please select thumbnail!' }]}
      >
        <Form.Item<UpdateBirdPayload>
          name='imageThumbnail'
          valuePropName='fileThumbnail'
          getValueFromEvent={normFile2}
          noStyle
        >
          <Upload {...uploadThumbnailProps}>
            {imageUrl ? (
              <img src={imageUrl} alt='imageThumbnail' style={{ width: '100%' }} />
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
      </Form.Item> */}
    </>
  )
}

export default UpdateImageContainer

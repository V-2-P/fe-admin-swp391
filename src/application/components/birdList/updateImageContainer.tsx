import React, { useState } from 'react'
import { Form, Upload, App, notification } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
// import { getBase64 } from '~/utils/imageUtils'
import { BirdImage, deleteBirdImageAPI, addBirdImageAPI } from '~/utils/api'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { getBirdImage } from '~/utils/imageUtils'

type BirdImages = {
  id: number
  imageUrl: string
}

type BirdEditProps = {
  id: number
  bird_images: BirdImages[]
}

const UpdateImageContainer: React.FC<BirdEditProps> = ({ id, bird_images }) => {
  const { message } = App.useApp()
  // const [imageUrl, setImageUrl] = useState<string>()
  const [fileImages, setFileImages] = useState<UploadFile[]>(
    bird_images.map((e) => ({
      uid: e.id.toString(),
      name: e.imageUrl,
      status: 'done',
      url: getBirdImage(e.imageUrl)
    }))
  )
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const normFile1 = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  //   const normFile2 = (e: any) => {
  //     console.log('Upload event:', e)

  //     return e?.file
  //   }
  const onChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImages(newFileList)
  }
  //   const onChangeThumbnail: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //     console.log(info)
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setImageUrl(url)
  //     })
  //   }

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
        dispatch(reFetchData())
      } else {
        console.log('1')
      }
    } catch (err) {
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  const uploadImagesProps: UploadProps = {
    type: fileImages.length === 0 ? 'drag' : 'select',
    name: 'fileImages',
    multiple: true,
    listType: 'picture-card',
    customRequest: async (options: any) => {
      try {
        const data = {
          imageFile: options.file
        }
        const res = await addBirdImageAPI(id, data)
        dispatch(reFetchData())
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

      return false
    },
    fileList: fileImages,
    onChange: onChangeImages,
    onPreview: onPreview,
    onRemove: onRemove
  }
  //   const uploadThumbnailProps: UploadProps = {
  //     type: 'drag',
  //     name: 'fileThumbnail',
  //     listType: 'picture-card',
  //     beforeUpload: (file: RcFile) => {
  //       const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  //       if (!isJpgOrPng) {
  //         message.error('You can only upload JPG/PNG file!')
  //       }
  //       const isLt2M = file.size / 1024 / 1024 < 2
  //       if (!isLt2M) {
  //         message.error('Image must smaller than 2MB!')
  //       }

  //       return isJpgOrPng && isLt2M
  //     },
  //     showUploadList: false,
  //     onChange: onChangeThumbnail,
  //     customRequest: ({ onSuccess }) => {
  //       setTimeout(() => {
  //         onSuccess!('ok')
  //       }, 0)
  //     }
  //

  // const onUpload = async (values: BirdImage) => {
  //   const payload: BirdImage = {
  //     ...(values.files &&
  //       values.files.length > 0 && {
  //         files: values.files.map((image: any) => image.originFileObj)
  //       })
  //   }
  //   try {
  //     const response = await a(id, payload)
  //     if (response) {
  //       notification.success({ message: 'Cập chim thành công' })
  //       dispatch(reFetchData())
  //     } else {
  //       notification.error({ message: 'Cập chim thất bại' })
  //     }
  //   } catch (err) {
  //     notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
  //   }
  // }

  console.log(id)

  return (
    <>
      <Form form={form}>
        <Form.Item<BirdImage> label='Hình ảnh'>
          <Form.Item name='files' valuePropName='fileImages' getValueFromEvent={normFile1} noStyle>
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

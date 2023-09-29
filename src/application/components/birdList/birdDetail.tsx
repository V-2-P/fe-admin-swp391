import React, { useState } from 'react'
import { Modal, Skeleton, Typography, Descriptions, Button, Image, App } from 'antd'
import type { DescriptionsProps } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'
const { Link } = Typography

type BirdDetail = {
  id: string | number
}

const items: DescriptionsProps['items'] = [
  {
    label: 'Tên chim',
    children: 'Chim 1'
  },
  {
    label: 'Trạng thái',
    children: 'Còn bán'
  },
  {
    label: 'Giới tính',
    children: 'Đực'
  },
  {
    label: 'Số lượng',
    children: 1
  },
  {
    label: 'Giá tiền',
    span: { xl: 2, xxl: 2 },
    children: formatCurrencyVND(100000)
  },
  {
    label: 'Độ thuần chủng',
    children: 'Thuần chủng'
  },
  {
    label: 'Chủng loại',
    children: 'Chủng loại 1'
  },
  {
    label: 'Danh mục',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        Danh mục 1
        <br />
        Danh mục 2
        <br />
        Danh mục 3
      </>
    )
  },
  {
    label: 'Mô tả',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: 'Chim cu là một loài chim nhỏ có tiếng hót đặc biệt.'
  },
  {
    label: 'Hình ảnh',
    span: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 },
    children: (
      <div className='w-full flex items-center justify-center'>
        <Image.PreviewGroup
          items={[
            'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
            'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
            'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
          ]}
        >
          <Image
            width={100}
            src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
          />
        </Image.PreviewGroup>
      </div>
    )
  },
  {
    label: 'Ảnh nhỏ',
    span: { xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 2 },
    children: (
      <div className='w-full flex items-center justify-center'>
        <Image
          width={100}
          src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
        />
      </div>
    )
  }
]
const BirdDetail: React.FC<BirdDetail> = ({ id }) => {
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const showModal = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(id)
    // fetch dữ liệu ở đây
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
      message.success('Click on Yes')
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <>
      <Link href='' onClick={showModal}>
        Xem
      </Link>

      <Modal
        title='Thông tin chim'
        style={{ top: 20 }}
        width={1000}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key='submit' type='primary' loading={confirmLoading} disabled={loading} onClick={handleOk}>
            Đồng ý
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Descriptions
            extra={<Button type='primary'>Edit</Button>}
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            items={items}
          />
        </Skeleton>
      </Modal>
    </>
  )
}

export default BirdDetail

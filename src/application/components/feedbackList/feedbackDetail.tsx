import React, { useState } from 'react'
import { Card, Modal, Skeleton, Typography, Button, Row, Col, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
const { Link } = Typography

type FeedbackDetailType = {
  id: string | number
}

const FeedbackDetail: React.FC<FeedbackDetailType> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const userDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên',
      children: 'Anh Vũ',
      span: 3
    },
    {
      key: '2',
      label: 'Địa chỉ',
      children: 'Fake address',
      span: 3
    },
    {
      key: '3',
      label: 'SĐT',
      children: '0707943005',
      span: 3
    }
  ]
  const feedbackDescription: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Mã đơn hàng',
      children: '#INV10001',
      span: 3
    },
    {
      key: '2',
      label: 'Mã chim',
      children: 'BIRD009',
      span: 3
    },
    {
      key: '3',
      label: 'Chim',
      children: 'Chim cu',
      span: 3
    },
    {
      key: '4',
      label: 'Số sao',
      children: (
        <div className='flex flex-row gap-1 items-center justify-center'>
          <StarFilled className='!text-orange-500' />
          <span>{Number(5).toPrecision(2)}</span>
        </div>
      ),
      span: 3
    },
    {
      key: '5',
      label: 'Đánh giá',
      children: 'Good service but delayed delivery',
      span: 3
    },
    {
      key: '6',
      label: 'Trạng thái',
      children: 'Hiện',
      span: 3
    },
    {
      key: '7',
      label: 'Ngày đánh giá',
      children: formatDateToDDMMYYYY(new Date()),
      span: 3
    }
  ]
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
    setOpen(false)
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
        title={`Thông tin đánh giá chi tiết`}
        style={{ top: 20 }}
        width={1000}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Descriptions title='Thông tin khách hàng' bordered={false} items={userDescription} />
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Descriptions title='Thông tin đánh giá' bordered={false} items={feedbackDescription} />
              </Card>
            </Col>
          </Row>
        </Skeleton>
      </Modal>
    </>
  )
}

export default FeedbackDetail

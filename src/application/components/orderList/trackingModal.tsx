import React, { useState } from 'react'
import { Button, Modal, Skeleton, Steps } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
type TrackingModalType = {
  buttonLoading: boolean
  id: string | number
}

const TrackingModal: React.FC<TrackingModalType> = ({ buttonLoading, id }) => {
  const [open, setOpen] = useState(false)
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

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  return (
    <>
      <Button key='tracking' onClick={showModal} type='primary' disabled={buttonLoading} icon={<SearchOutlined />}>
        Theo dõi
      </Button>

      <Modal
        title={id}
        style={{ top: 20 }}
        // width={1000}
        open={open}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Thoát
          </Button>
        ]}
      >
        <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
          <Steps
            progressDot
            current={1}
            direction='vertical'
            items={[
              {
                title: 'Finished',
                subTitle: 'Aug 12, 2023 09.25am',
                description: 'This is a description. This is a description.'
              },
              {
                title: 'Finished',
                subTitle: 'Aug 12, 2023 09.25am',
                description: 'This is a description. This is a description.'
              },
              {
                title: 'In Progress',
                subTitle: '00:00:05',
                description: 'This is a description. This is a description.'
              },
              {
                title: 'Waiting',
                subTitle: 'Aug 12, 2023 09.25am',
                description: 'This is a description.'
              },
              {
                title: 'Waiting',
                subTitle: 'Aug 12, 2023 09.25am',
                description: 'This is a description.'
              }
            ]}
          />
        </Skeleton>
      </Modal>
    </>
  )
}

export default TrackingModal

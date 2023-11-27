import { MenuProps, Spin, Tag, Dropdown, App } from 'antd'
import { useState } from 'react'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { BirdPairing, updateStatusPairingAPI } from '~/utils/api/booking'

type UpdateBirdPairingStatusProps = {
  status: string
  id: number
  changeStatus: (id: number, data: BirdPairing) => void
}

const UpdateBirdPairingStatus: React.FC<UpdateBirdPairingStatusProps> = ({ id, status, changeStatus }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const options = [{ value: 'Egg' }, { value: 'Fledgling' }, { value: 'Failed' }]
  const items: MenuProps['items'] = options.map((option) => ({
    label: (
      <Tag bordered={false} color={'processing'} className='!w-full !text-center'>
        {option.value}
      </Tag>
    ),
    key: option.value
  }))
  const changeStatusPairing = async (status: string) => {
    setLoading(true)
    try {
      setLoading(false)
      const response = await updateStatusPairingAPI(id, status)
      if (response) {
        notification.success({ message: 'Cập nhật trạng thái thành công' })
        changeStatus(id, response.data)
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
  const onClick: MenuProps['onClick'] = ({ key }) => {
    changeStatusPairing(key)
  }
  return (
    <Spin spinning={loading}>
      <Dropdown menu={{ items, onClick }} trigger={['click']} placement='bottomRight' className='cursor-pointer'>
        <a onClick={(e) => e.currentTarget}>
          <Tag bordered={false} color={'processing'} className='!w-full !text-center'>
            {status}
          </Tag>
        </a>
      </Dropdown>
    </Spin>
  )
}

export default UpdateBirdPairingStatus

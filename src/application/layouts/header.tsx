import React, { useEffect, useState } from 'react'
import { Layout, Button, Drawer, Typography, Grid, theme, Dropdown, Avatar, Space } from 'antd'
import { MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Menu from './menu'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHook'
import { logout } from '~/redux/slices'

const { Title } = Typography
const { useBreakpoint } = Grid

const Header: React.FC = () => {
  const screens = useBreakpoint()
  const dispatch = useAppDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const profiles: MenuProps['items'] = [
    {
      label: (
        <Link to='/profile'>
          <Space>
            <UserOutlined className='!text-[24px]' />
            Thông tin cá nhân
          </Space>
        </Link>
      ),
      key: '0'
    },

    {
      type: 'divider'
    },
    {
      label: (
        <p onClick={() => dispatch(logout())}>
          <Space>
            <LogoutOutlined className='!text-[24px]' />
            Đăng xuất
          </Space>
        </p>
      ),
      key: '3'
    }
  ]
  const onClose = () => {
    setCollapsed(false)
  }
  useEffect(() => {
    if (screens.lg) {
      setCollapsed(false)
    }
  }, [screens.lg])
  return (
    <Layout.Header
      style={{ padding: 0, background: colorBgContainer }}
      className='flex flex-row items-center justify-between !px-[30px] lg:!px-[56px] lg:!pl-[36px]'
    >
      <Drawer
        style={{ background: '#001529' }}
        closeIcon={false}
        width={250}
        bodyStyle={{ padding: 0 }}
        placement='left'
        onClose={onClose}
        open={collapsed}
      >
        <>
          <div className='pt-4 pb-2 pl-6 flex items-center w-full'>
            <div className='w-12 h-12 rounded-full border-2 border-sky-600 flex items-center justify-center text-sky-800 font-bold text-lg'>
              <span className='flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500'>V2P</span>
            </div>
            <Title level={4} className='!mb-0 ml-2 !text-white !font-medium'>
              Bird Farm
            </Title>
          </div>
          <Menu />
        </>
      </Drawer>
      <Button
        type='text'
        icon={<MenuOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className='lg:!hidden !text-[1rem] !w-16 !h-16'
      />
      <div className='flex flex-row items-center gap-4 ml-auto'>
        <Dropdown menu={{ items: profiles, className: 'min-w-[200px]' }} trigger={['click']} placement='bottomRight'>
          <div className='cursor-pointer'>
            <Avatar size='large' icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  )
}

export default Header

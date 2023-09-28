import React, { useEffect, useState } from 'react'
import { Layout, Button, Drawer, Typography, Grid, theme, Badge, Dropdown, Avatar, Space } from 'antd'
import {
  MenuOutlined,
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  LogoutOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Menu from './menu'

const { Title } = Typography
const { useBreakpoint } = Grid

const notifications: MenuProps['items'] = [
  {
    label: (
      <a href='https://www.antgroup.com'>
        <div className='unread flex flex-wrap flex-row items-center border-b border-gray-100 dark:border-gray-800 [&amp;.unread]:bg-surface-400 dark:[&amp;.unread]:bg-surfacedark-400 hover:bg-surface-200 dark:hover:bg-surfacedark-200 py-2'>
          <div className='flex-shrink max-w-full px-2 w-1/4 text-center'>
            <MessageOutlined className='text-[32px]' />
          </div>
          <div className='flex-shrink max-w-full px-2 w-3/4'>
            <div className='text-body-md'>Time for a meeting with Mr.Roger</div>
            <div className='text-gray-500 text-body-md mt-1'>5 Minutes Ago</div>
          </div>
        </div>
      </a>
    ),
    key: '0'
  },
  {
    label: (
      <a href='https://www.antgroup.com'>
        <div className='unread flex flex-wrap flex-row items-center border-b border-gray-100 dark:border-gray-800 [&amp;.unread]:bg-surface-400 dark:[&amp;.unread]:bg-surfacedark-400 hover:bg-surface-200 dark:hover:bg-surfacedark-200 py-2'>
          <div className='flex-shrink max-w-full px-2 w-1/4 text-center'>
            <MessageOutlined className='text-[32px]' />
          </div>
          <div className='flex-shrink max-w-full px-2 w-3/4'>
            <div className='text-body-md'>Time for a meeting with Mr.Roger</div>
            <div className='text-gray-500 text-body-md mt-1'>5 Minutes Ago</div>
          </div>
        </div>
      </a>
    ),
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: <a className='w-full flex justify-center items-center'>Show all Notifications</a>,
    key: '3'
  }
]
const profiles: MenuProps['items'] = [
  {
    label: (
      <a href='https://www.antgroup.com'>
        <Space>
          <UserOutlined className='!text-[24px]' />
          Profile
        </Space>
      </a>
    ),
    key: '0'
  },
  {
    label: (
      <a href='https://www.antgroup.com'>
        <Space>
          <QuestionCircleOutlined className='!text-[24px]' />
          Help
        </Space>
      </a>
    ),
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: (
      <a href='https://www.antgroup.com'>
        <Space>
          <LogoutOutlined className='!text-[24px]' />
          Logout
        </Space>
      </a>
    ),
    key: '3'
  }
]
const Header: React.FC = () => {
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

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
        width={225}
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
        <Dropdown className='w-[50px]' menu={{ items: notifications }} trigger={['click']} placement='bottomRight'>
          <div className='cursor-pointer flex justify-center items-center'>
            <Badge count={200} overflowCount={10}>
              <BellOutlined className='!text-[28px]' />
            </Badge>
          </div>
        </Dropdown>
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

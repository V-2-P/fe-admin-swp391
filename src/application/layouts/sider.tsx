import React from 'react'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons'
import { Layout, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'

const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
const items: MenuItem[] = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8')
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')])
  ])
]
const Sider: React.FC = () => {
  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}
      className='select-none'
    >
      <div className='pt-4 pb-2 pl-6 flex items-center w-full'>
        <div className='w-12 h-12 rounded-full border-2 border-sky-600 flex items-center justify-center text-sky-800 font-bold text-lg'>
          <span className='flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500'>V2P</span>
        </div>
        <Title level={4} className='!mb-0 ml-2 !text-white !font-medium'>
          Bird Farm
        </Title>
      </div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />
    </Layout.Sider>
  )
}

export default Sider

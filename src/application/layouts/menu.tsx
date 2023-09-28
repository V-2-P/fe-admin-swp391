import React from 'react'
import { AppstoreOutlined, ShopOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons'
import { Menu as AntMenu } from 'antd'
import type { MenuProps } from 'antd'

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
  getItem('Dashboard', '1', <DashboardOutlined />),

  getItem('Quản lý nông trại', 'sub1', <ShopOutlined />, [
    getItem('Danh sách chim', '5', <ProfileOutlined />),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8')
  ]),

  getItem('Quản lý khách hàng', 'sub2', <AppstoreOutlined />, [
    getItem('Danh sách khách hàng', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11')
  ])
]
const Menu: React.FC = () => {
  return <AntMenu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />
}

export default Menu

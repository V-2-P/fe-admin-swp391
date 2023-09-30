import React from 'react'
import {
  PlusOutlined,
  AppstoreOutlined,
  ShopOutlined,
  DashboardOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
  ContainerOutlined
} from '@ant-design/icons'
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
  getItem('Thông tin cá nhân', '2', <UserOutlined />),
  getItem('Quản lý nông trại', 'sub1', <ShopOutlined />, [
    getItem('Danh sách chim', '3', <ProfileOutlined />),
    getItem('Thêm chim', '4', <PlusOutlined />),
    getItem('Option 5', '5'),
    getItem('Option 6', '6')
  ]),
  getItem('Quản lý đơn đặt hàng', 'sub2', <AppstoreOutlined />, [
    getItem('Danh sách đơn đặt hàng', '7', <ContainerOutlined />),
    getItem('Option 8', '8'),
    getItem('Option 9', '9')
  ]),
  getItem('Quản lý khách hàng', 'sub3', <AppstoreOutlined />, [
    getItem('Danh sách khách hàng', '10', <TeamOutlined />),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ]),
  getItem('Quản lý nhân viên', 'sub4', <AppstoreOutlined />, [
    getItem('Danh sách nhân viên', '13', <TeamOutlined />),
    getItem('Option 14', '14'),
    getItem('Option 15', '15')
  ])
]
const Menu: React.FC = () => {
  return <AntMenu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />
}

export default Menu

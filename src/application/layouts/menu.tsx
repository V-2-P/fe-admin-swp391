import React, { useState } from 'react'
import {
  PlusOutlined,
  AppstoreOutlined,
  ShopOutlined,
  DashboardOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
  ContainerOutlined,
  CarOutlined
} from '@ant-design/icons'
import { Menu as AntMenu } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

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
  getItem('Tổng quan', '/dashboard', <DashboardOutlined />),
  getItem('Thông tin cá nhân', '/profile', <UserOutlined />),
  getItem('Quản lý nông trại', 'sub1', <ShopOutlined />, [
    getItem('Danh sách chim', '/birdlist', <ProfileOutlined />),
    getItem('Thêm chim', '/addbird', <PlusOutlined />)
  ]),
  getItem('Quản lý đơn đặt hàng', 'sub2', <AppstoreOutlined />, [
    getItem('Danh sách đơn đặt hàng', '/orderlist', <ContainerOutlined />),
    getItem('Giao hàng', '/delivery', <CarOutlined />)
  ]),
  getItem('Quản lý khách hàng', 'sub3', <AppstoreOutlined />, [
    getItem('Danh sách khách hàng', '/customerlist', <TeamOutlined />)
  ]),
  getItem('Quản lý nhân viên', 'sub4', <AppstoreOutlined />, [
    getItem('Danh sách nhân viên', '/stafflist', <TeamOutlined />)
  ])
]

const findSubmenuByPath = (items: any[], path: string): string => {
  let submenu: any

  const find = (items: any[]) => {
    for (const item of items) {
      if (item.key === path) {
        return true
      }

      if (item.children) {
        const found = find(item.children)
        if (found) {
          submenu = item
          return true
        }
      }
    }
  }

  find(items)

  return submenu ? submenu.key : ''
}
const Menu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState([findSubmenuByPath(items, location.pathname)])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys)
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  return (
    <AntMenu
      theme='dark'
      onClick={onClick}
      mode='inline'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[location.pathname]}
      items={items}
    />
  )
}

export default Menu

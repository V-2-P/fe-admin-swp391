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
  CarOutlined,
  CommentOutlined,
  EditOutlined
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
    getItem('Danh sách loài chim', '/birdtypelist', <ProfileOutlined />),
    getItem('Thêm chim', '/addbird', <PlusOutlined />)
  ]),
  getItem('Quản lý website', 'sub2', <ShopOutlined />, [getItem('Xem đánh giá', '/feedbacklist', <CommentOutlined />)]),
  getItem('Quản lý đơn đặt hàng', 'sub3', <AppstoreOutlined />, [
    getItem('Danh sách đơn đặt hàng', '/orderlist', <ContainerOutlined />),
    getItem('Giao hàng', '/delivery', <CarOutlined />)
  ]),
  getItem('Quản lý khách hàng', 'sub4', <AppstoreOutlined />, [
    getItem('Danh sách khách hàng', '/customerlist', <TeamOutlined />),
    getItem('Cập nhật khách hàng', '/updatecustomer', <EditOutlined />)
  ]),
  getItem('Quản lý nhân viên', 'sub5', <AppstoreOutlined />, [
    getItem('Danh sách nhân viên', '/stafflist', <TeamOutlined />),
    getItem('Cập nhật nhân viên', '/updatestaff', <EditOutlined />)
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
  const regex = /\/.+\/.+/g
  const navigate = useNavigate()
  const location = useLocation()
  const cleanedPathname = regex.test(location.pathname) ? '/' + location.pathname.split('/')[1] : location.pathname
  const [openKeys, setOpenKeys] = useState([findSubmenuByPath(items, cleanedPathname)])

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
      selectedKeys={[cleanedPathname]}
      items={items}
    />
  )
}

export default Menu

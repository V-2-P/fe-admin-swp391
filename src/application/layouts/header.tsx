import React from 'react'
import { Layout, theme } from 'antd'
const Header: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return <Layout.Header style={{ padding: 0, background: colorBgContainer }} />
}

export default Header

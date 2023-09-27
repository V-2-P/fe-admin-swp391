import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Sider from './sider'
import Header from './header'
import Footer from './footer'

const { Content } = Layout

const CommonLayout: React.FC = () => {
  return (
    <Layout hasSider>
      <Sider />
      <Layout className='site-layout' style={{ marginLeft: 200 }}>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default CommonLayout

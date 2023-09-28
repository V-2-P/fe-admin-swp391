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
      <Layout className='lg:!ml-[225px]'>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', minHeight: 'calc(100vh - 158px)' }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default CommonLayout

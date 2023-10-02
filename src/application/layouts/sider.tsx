import React from 'react'
import { Layout, Typography } from 'antd'
import Menu from './menu'

const { Title } = Typography

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
      width={250}
      className='select-none !hidden lg:!block hide-scrollbar'
    >
      <div className='pt-4 pb-2 pl-6 flex items-center w-full'>
        <div className='w-12 h-12 rounded-full border-2 border-sky-600 flex items-center justify-center text-sky-800 font-bold text-lg'>
          <span className='flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500'>V2P</span>
        </div>
        <Title level={4} className='!mb-0 ml-2 !text-white !font-medium'>
          Bird Farm
        </Title>
      </div>
      <Menu />
    </Layout.Sider>
  )
}

export default Sider

import React, { useState } from 'react'
import { Typography, Radio, Card, Statistic, Row, Col, Grid, Space, Table, Tag } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import ColumnChart from '~/application/components/dashboard/ColumnChart'
import type { ColumnsType } from 'antd/es/table'
import { getStatusInfo } from '~/utils/statusUtils'
import { formatCurrencyVND } from '~/utils/numberUtils'

const { Title } = Typography
const { useBreakpoint } = Grid

interface DataType {
  key: string
  name: string
  amount: number
  status: string
  invoice: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Billing',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (_, { amount }) => {
      return formatCurrencyVND(amount)
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      const s = getStatusInfo(status)
      return (
        <Tag color={s.color} key={status}>
          {s.name}
        </Tag>
      )
    }
  },
  {
    title: 'Invoive',
    dataIndex: 'invoice',
    key: 'invoice'
  }
]

const dataTable: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    amount: 100000,
    status: 'Process',
    invoice: '#INV9834'
  },
  {
    key: '2',
    name: 'Jim Green',
    amount: 200000,
    status: 'Shipping',
    invoice: '#INV9834'
  },
  {
    key: '3',
    name: 'Joe Black',
    amount: 300000,
    status: 'Complete',
    invoice: '#INV9834'
  },
  {
    key: '4',
    name: 'Joe Red',
    amount: 400000,
    status: 'Cancelled',
    invoice: '#INV9834'
  },
  {
    key: '5',
    name: 'Joe White',
    amount: 500000,
    status: 'Cancelled',
    invoice: '#INV9834'
  }
]
const data1 = [
  {
    day: 'Thứ 2',
    money: 50000
  },
  {
    day: 'Thứ 3',
    money: 35000
  },
  {
    day: 'Thứ 4',
    money: 25000
  },
  {
    day: 'Thứ 5',
    money: 15000
  },
  {
    day: 'Thứ 6',
    money: 8500
  },
  {
    day: 'Thứ 7',
    money: 1500
  },
  {
    day: 'Chủ nhật',
    money: 3150
  }
]
const data2 = [
  {
    day: 'Tháng 1',
    money: 50000
  },
  {
    day: 'Tháng 2',
    money: 35000
  },
  {
    day: 'Tháng 3',
    money: 25000
  },
  {
    day: 'Tháng 4',
    money: 15000
  },
  {
    day: 'Tháng 5',
    money: 8500
  },
  {
    day: 'Tháng 6',
    money: 1500
  },
  {
    day: 'Tháng 7',
    money: 3150
  },
  {
    day: 'Tháng 8',
    money: 1250
  },
  {
    day: 'Tháng 9',
    money: 6050
  },
  {
    day: 'Tháng 9',
    money: 7211
  },
  {
    day: 'Tháng 10',
    money: 4200
  },
  {
    day: 'Tháng 11',
    money: 5500
  },
  {
    day: 'Tháng 12',
    money: 8500
  }
]
const DashboardPage: React.FC = () => {
  const screens = useBreakpoint()
  const [size, setSize] = useState<string>('daily')
  const [data, setData] = useState(data1)
  const handleFilterChange = (e: RadioChangeEvent) => {
    setSize(e.target.value)
    if (data === data1) {
      setData(data2)
    } else {
      setData(data1)
    }
  }

  return (
    <div className='main-content flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Tổng quan</Title>
          <Radio.Group value={size} onChange={handleFilterChange}>
            <Radio.Button value='daily'>Daily</Radio.Button>
            <Radio.Button value='monthly'>Monthly</Radio.Button>
          </Radio.Group>
        </div>
        <Row gutter={[32, 32]}>
          <Col span={screens.lg ? 12 : 24}>
            <Card bordered={false}>
              <ColumnChart data={data} />
            </Card>
          </Col>
          <Col span={screens.lg ? 12 : 24}>
            <Row gutter={[32, 32]}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title='Lợi nhuận'
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix='%'
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title='Tổng đơn hàng' value={1000} />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title='Tổng ghép chim' value={2150} />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title='Số lượng tài khoản' value={4000} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <Card>
              <Card.Meta
                title='Bestseller'
                description={
                  <div>
                    <div className='flex flex-col gap-1 py-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>Chim cu</div>
                        <span>16,050</span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 py-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>Chim cu</div>
                        <span>16,050</span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 py-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>Chim cu</div>
                        <span>16,050</span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 py-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>Chim cu</div>
                        <span>16,050</span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 py-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>Chim cu</div>
                        <span>16,050</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <Card.Meta
                title='Latest Order'
                description={
                  <Table
                    pagination={{
                      pageSize: 4
                    }}
                    columns={columns}
                    dataSource={dataTable}
                  />
                }
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default DashboardPage

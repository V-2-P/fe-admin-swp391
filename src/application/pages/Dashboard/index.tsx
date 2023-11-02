import React, { useEffect, useState } from 'react'
import { Typography, Radio, Card, Statistic, Row, Col, Grid, Space, Table, Tag, App, Result } from 'antd'
import type { RadioChangeEvent } from 'antd'
import ColumnChart from '~/application/components/dashboard/ColumnChart'
import type { ColumnsType } from 'antd/es/table'
import { getOrderStatus } from '~/utils/statusUtils'
import { formatCurrencyVND, formatCurrencyVNDToString } from '~/utils/numberUtils'
import { RevenueData, getRevenueAPI } from '~/utils/api'
import useFetchData from '~/application/hooks/useFetchData'

const { Title } = Typography
const { useBreakpoint } = Grid

interface DataType {
  userName: string
  amount: number
  status: string
  invoive: number
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Người đặt hàng',
    dataIndex: 'userName',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'amount',
    render: (_, { amount }) => {
      return formatCurrencyVND(amount)
    }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (_, { status }) => {
      const s = getOrderStatus(status)
      return (
        <Tag color={s.color} key={status}>
          {s.name}
        </Tag>
      )
    }
  },
  {
    title: 'Mã hóa đơn',
    dataIndex: 'invoive'
  }
]

const DashboardPage: React.FC = () => {
  const screens = useBreakpoint()
  const [bestSellerLoading, bestsellerError, bestsellerResponse] = useFetchData(`/dashboards/bestseller`)
  const [orderLoading, orderError, orderResponse] = useFetchData(`/dashboards/order?page=0&limit=10`)
  const [size, setSize] = useState<'daily' | 'month'>('daily')
  const [data, setData] = useState<RevenueData>()
  const { notification } = App.useApp()
  const [loading, setLoading] = useState<boolean>(false)
  const handleFilterChange = async (e: RadioChangeEvent) => {
    setSize(e.target.value)
    const search = e.target.value
    setLoading(true)
    try {
      const response = await getRevenueAPI(search)
      setLoading(false)
      if (response) {
        const revenueData: RevenueData = response.data
        if (search === 'daily') {
          for (let i = 0; i < 6; i++) {
            revenueData.weeklyRevenue[i].day = `Thứ ${i + 2}`
          }
          revenueData.weeklyRevenue[6].day = `Chủ nhật`
        }
        if (search === 'month') {
          for (let i = 0; i < 12; i++) {
            revenueData.weeklyRevenue[i].day = `Tháng ${i + 1}`
          }
        }
        setData(revenueData)
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  useEffect(() => {
    const getDashboard = async () => {
      setLoading(true)
      try {
        const response = await getRevenueAPI(size)
        setLoading(false)
        if (response) {
          const revenueData: RevenueData = response.data
          if (size === 'daily') {
            for (let i = 0; i < 6; i++) {
              revenueData.weeklyRevenue[i].day = `Thứ ${i + 2}`
            }
            revenueData.weeklyRevenue[6].day = `Chủ nhật`
          }
          if (size === 'month') {
            for (let i = 0; i < 12; i++) {
              revenueData.weeklyRevenue[i].day = `Tháng ${i + 1}`
            }
          }
          setData(revenueData)
        } else {
          notification.error({ message: 'Sorry! Something went wrong. App server error' })
        }
      } catch (err) {
        setLoading(false)
        notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
      }
    }
    getDashboard()
  }, [notification, size])
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Tổng quan</Title>
          <Radio.Group value={size} onChange={handleFilterChange}>
            <Radio.Button value='daily'>Daily</Radio.Button>
            <Radio.Button value='month'>Monthly</Radio.Button>
          </Radio.Group>
        </div>
        <Row gutter={[32, 32]}>
          <Col span={screens.lg ? 12 : 24}>
            <Card bordered={false} loading={loading}>
              <ColumnChart data={data ? data.weeklyRevenue : []} />
            </Card>
          </Col>
          <Col span={screens.lg ? 12 : 24}>
            <Row gutter={[32, 32]}>
              <Col span={12}>
                <Card bordered={false} loading={loading}>
                  <Statistic title='Tổng đơn hàng' value={data ? data.totalOrders : 0} suffix='đơn' />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} loading={loading}>
                  <Statistic title='Tổng đơn lai chim' value={data ? data.totalBookings : 0} suffix='đơn' />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} loading={loading}>
                  <Statistic title='Số lượng khách hàng' value={data ? data.totalCustomerUsers : 0} suffix='người' />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} loading={loading}>
                  <Statistic
                    title='Tổng doanh thu'
                    formatter={(value) => formatCurrencyVNDToString(value as number)}
                    value={data ? data.totalRevenue : 0}
                    suffix='VNĐ'
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={screens.lg ? 8 : 24}>
            <Card loading={bestSellerLoading}>
              <Card.Meta
                title='Bestseller'
                description={
                  bestsellerError ? (
                    <Result title='Failed to fetch' subTitle={bestsellerError} status='error' />
                  ) : (
                    <div>
                      {bestsellerResponse &&
                        bestsellerResponse.data.map((item: { birdName: string; totalSold: number }, index: number) => (
                          <div className='flex flex-col gap-1 py-2' key={index}>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center'>{item.birdName}</div>
                              <span>{item.totalSold}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                }
              />
            </Card>
          </Col>
          <Col span={screens.lg ? 16 : 24}>
            <Card loading={orderLoading}>
              <Card.Meta
                title='Đơn hàng gần nhất'
                description={
                  orderError ? (
                    <Result title='Failed to fetch' subTitle={orderError} status='error' />
                  ) : (
                    <Table
                      pagination={false}
                      columns={columns}
                      dataSource={orderResponse ? orderResponse.data.orderResponses : []}
                    />
                  )
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

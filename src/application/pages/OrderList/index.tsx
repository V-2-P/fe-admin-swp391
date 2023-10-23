import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input, Result } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
import OrderDetail from '~/application/components/orderList/orderDetail'
import { formatCurrencyVND } from '~/utils/numberUtils'
import useFetchData from '~/application/hooks/useFetchData'

const { Title } = Typography

type Order = {
  id: number
  userId: number
  fullName: string
  phoneNumber: string
  shippingAddress: string
  note: string
  totalMoney: number
  totalPayment: number
  discount: number
  orderDate: string
  status: 'pending' | 'completed' | 'cancelled' // Các trạng thái có thể thay đổi
  paymentMethod: string
  shippingMethod: string
  shippingDate: string
  trackingNumber: string
  orderDetails: OrderDetail[]
}

type OrderDetail = {
  birdId: number
  birdName: string
  thumbnail: string
  gender: 'male' | 'female' // Các giới tính có thể thay đổi
  price: number
  numberOfProducts: number
}

type OrderResponse = {
  orderResponses: Order[]
  totalPages: number
}

type OrderIndex = keyof Order

const OrderList: React.FC = () => {
  const limit = 10
  const page = 1
  const [loading, error, response] = useFetchData(`/orders?page=${page}&limit=${limit}`)
  const res: OrderResponse = response
  const totalPages = res ? res.totalPages : 0
  const data: Order[] = res ? res.orderResponses : []
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: OrderIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex: OrderIndex): ColumnType<Order> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })
  const columns: ColumnsType<Order> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Khách hàng',
      dataIndex: 'fullName',
      ...getColumnSearchProps('fullName'),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      title: 'OrderDate',
      dataIndex: 'orderDate',
      sorter: (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
      render: (_, { orderDate }) => {
        return formatDateToDDMMYYYY(new Date(orderDate))
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalMoney',
      sorter: (a, b) => a.totalMoney - b.totalMoney,
      render: (_, record) => formatCurrencyVND(record.totalMoney),
      align: 'right'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <OrderDetail id={record.id} />,
      width: '20%'
    }
  ]
  const onChange: TableProps<Order>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách đơn đặt hàng</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              {error ? (
                <Result title='Failed to fetch' subTitle={error} status='error' />
              ) : (
                <Table
                  loading={loading}
                  style={{ minHeight: 300 }}
                  columns={columns}
                  pagination={{ pageSize: limit, total: totalPages }}
                  scroll={{ x: 800, y: 300 }}
                  dataSource={data}
                  onChange={onChange}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default OrderList

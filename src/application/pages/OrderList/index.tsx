import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'

const { Title, Link } = Typography

interface DataType {
  id: string
  customerName: string
  orderDate: Date
  status: string
  total: number
}

type DataIndex = keyof DataType

const dataTable: DataType[] = [
  {
    id: '#INV10001',
    customerName: 'Khách hàng A',
    orderDate: new Date('2023-09-29'),
    status: 'Đã giao hàng',
    total: 100.5
  },
  {
    id: '#INV10002',
    customerName: 'Khách hàng B',
    orderDate: new Date('2023-09-28'),
    status: 'Đang xử lý',
    total: 75.0
  },
  {
    id: '#INV10003',
    customerName: 'Khách hàng C',
    orderDate: new Date('2023-09-27'),
    status: 'Đã hủy',
    total: 50.25
  },
  {
    id: '#INV10004',
    customerName: 'Khách hàng D',
    orderDate: new Date('2023-09-26'),
    status: 'Đã giao hàng',
    total: 125.75
  },
  {
    id: '#INV10005',
    customerName: 'Khách hàng E',
    orderDate: new Date('2023-09-25'),
    status: 'Đang xử lý',
    total: 90.0
  },
  {
    id: '#INV10006',
    customerName: 'Khách hàng F',
    orderDate: new Date('2023-09-24'),
    status: 'Đã giao hàng',
    total: 60.5
  },
  {
    id: '#INV10007',
    customerName: 'Khách hàng G',
    orderDate: new Date('2023-09-23'),
    status: 'Đang xử lý',
    total: 55.25
  },
  {
    id: '#INV10008',
    customerName: 'Khách hàng H',
    orderDate: new Date('2023-09-22'),
    status: 'Đã giao hàng',
    total: 80.0
  },
  {
    id: '#INV10009',
    customerName: 'Khách hàng I',
    orderDate: new Date('2023-09-21'),
    status: 'Đang xử lý',
    total: 95.75
  },
  {
    id: '#INV10010',
    customerName: 'Khách hàng J',
    orderDate: new Date('2023-09-20'),
    status: 'Đã hủy',
    total: 40.0
  },
  {
    id: '#INV10011',
    customerName: 'Khách hàng K',
    orderDate: new Date('2023-09-19'),
    status: 'Đang xử lý',
    total: 70.25
  }
]

const OrderList: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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
  const columns: ColumnsType<DataType> = [
    {
      title: 'OrderId',
      dataIndex: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      ...getColumnSearchProps('customerName'),
      sorter: (a, b) => a.customerName.localeCompare(b.customerName)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'OrderDate',
      dataIndex: 'orderDate',
      sorter: (a, b) => a.orderDate.getTime() - b.orderDate.getTime(),
      render: (_, { orderDate }) => {
        return formatDateToDDMMYYYY(orderDate)
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, _record) => (
        <Link href='https://ant.design' target='_blank'>
          Xem
        </Link>
      ),
      width: '20%'
    }
  ]
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
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
              <Table
                style={{ minHeight: 300 }}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800, y: 300 }}
                dataSource={dataTable}
                onChange={onChange}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default OrderList

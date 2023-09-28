import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'

const { Title, Link } = Typography

interface DataType {
  id: number
  name: string
  email: string
  status: string
  spend: number
  numberOfOrders: number
}

type DataIndex = keyof DataType

const dataTable: DataType[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    status: 'Active',
    spend: 500,
    numberOfOrders: 10
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    status: 'Inactive',
    spend: 250,
    numberOfOrders: 5
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    status: 'Active',
    spend: 800,
    numberOfOrders: 15
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    status: 'Active',
    spend: 300,
    numberOfOrders: 8
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    status: 'Inactive',
    spend: 150,
    numberOfOrders: 3
  },
  {
    id: 6,
    name: 'Nguyễn Thị F',
    email: 'nguyenthif@example.com',
    status: 'Active',
    spend: 700,
    numberOfOrders: 12
  },
  {
    id: 7,
    name: 'Trần Văn G',
    email: 'tranvang@example.com',
    status: 'Inactive',
    spend: 200,
    numberOfOrders: 4
  },
  {
    id: 8,
    name: 'Lê Thị H',
    email: 'lethih@example.com',
    status: 'Active',
    spend: 600,
    numberOfOrders: 11
  },
  {
    id: 9,
    name: 'Phạm Văn I',
    email: 'phamvani@example.com',
    status: 'Active',
    spend: 400,
    numberOfOrders: 7
  },
  {
    id: 10,
    name: 'Hoàng Thị K',
    email: 'hoangthik@example.com',
    status: 'Inactive',
    spend: 100,
    numberOfOrders: 2
  },
  {
    id: 11,
    name: 'Hoàng Thị t',
    email: 'hoangthik@example.com',
    status: 'Inactive',
    spend: 100,
    numberOfOrders: 2
  }
]

const CustomerList: React.FC = () => {
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
      title: 'Customer',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '30%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: '30%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: '12%'
    },
    {
      title: 'Order',
      dataIndex: 'numberOfOrders',
      sorter: (a, b) => a.numberOfOrders - b.numberOfOrders,
      width: '10%'
    },
    {
      title: 'Spend',
      dataIndex: 'spend',
      sorter: (a, b) => a.spend - b.spend,
      render: (_, { spend }) => {
        return formatCurrencyVND(spend)
      },
      width: '10%'
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, _record) => (
        <Space size='middle'>
          <Link href='https://ant.design' target='_blank'>
            Edit
          </Link>
          <Link type='danger' href='https://ant.design' target='_blank'>
            Delete
          </Link>
        </Space>
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
          <Title level={3}>Danh sách khách hàng</Title>
          <Button type='primary' icon={<PlusOutlined />} shape='round' size='large'>
            Thêm khách hàng
          </Button>
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

export default CustomerList

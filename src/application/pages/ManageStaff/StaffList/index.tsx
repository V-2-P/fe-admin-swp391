import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

interface DataType {
  id: number
  name: string
  email: string
  status: string
  phone: string
  createdAt: Date
}

type DataIndex = keyof DataType

const dataTable: DataType[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    status: 'Hoạt động',
    phone: '0123456789',
    createdAt: new Date('2023-09-01')
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    status: 'Nghỉ phép',
    phone: '0987654321',
    createdAt: new Date('2023-08-15')
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    status: 'Hoạt động',
    phone: '0369852147',
    createdAt: new Date('2023-07-20')
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    status: 'Hoạt động',
    phone: '0912345678',
    createdAt: new Date('2023-06-10')
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    status: 'Nghỉ phép',
    phone: '0345678901',
    createdAt: new Date('2023-05-05')
  },
  {
    id: 6,
    name: 'Trần Văn F',
    email: 'tranvanf@example.com',
    status: 'Hoạt động',
    phone: '0765432190',
    createdAt: new Date('2023-04-15')
  },
  {
    id: 7,
    name: 'Nguyễn Thị G',
    email: 'nguyenthig@example.com',
    status: 'Nghỉ phép',
    phone: '0598765432',
    createdAt: new Date('2023-03-20')
  },
  {
    id: 8,
    name: 'Lê Thị H',
    email: 'lethih@example.com',
    status: 'Hoạt động',
    phone: '0876543210',
    createdAt: new Date('2023-02-10')
  },
  {
    id: 9,
    name: 'Vũ Văn I',
    email: 'vuvani@example.com',
    status: 'Hoạt động',
    phone: '0654321098',
    createdAt: new Date('2023-01-05')
  },
  {
    id: 10,
    name: 'Nguyễn Văn J',
    email: 'nguyenvanj@example.com',
    status: 'Nghỉ phép',
    phone: '0432109876',
    createdAt: new Date('2022-12-20')
  },
  {
    id: 11,
    name: 'Phan Thị K',
    email: 'phanthik@example.com',
    status: 'Hoạt động',
    phone: '0765432109',
    createdAt: new Date('2022-11-15')
  }
]

const StaffList: React.FC = () => {
  const navigate = useNavigate()
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
      title: 'Staff',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },

    {
      title: 'SĐT',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' direction='vertical' className='!w-full'>
          <Row>
            <Button type='link'>Xem</Button>
            <Button
              type='link'
              onClick={() => {
                navigate(`/updatecustomer/${record.id}`)
              }}
            >
              Cập nhật
            </Button>
          </Row>
          <Row>
            <Button type='link' danger>
              Khóa
            </Button>
          </Row>
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
          <Title level={3}>Danh sách nhân viên</Title>
          <Button type='primary' icon={<PlusOutlined />} shape='round' size='large'>
            Thêm Nhân viên
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

export default StaffList

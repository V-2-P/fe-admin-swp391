import React, { useEffect, useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input, Result, App } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { useNavigate } from 'react-router-dom'
import useFetchData from '~/application/hooks/useFetchData'
import DeleteButton from '~/application/components/shared/DeleteButton'
import { deleteUserAPI } from '~/utils/api/user'

const { Title } = Typography

type Staff = {
  createdAt: Date
  updatedAt: Date
  id: number
  fullName: string
  phoneNumber: string
  email: string
  address: string
  imageUrl: string
  roleEntity: {
    id: number
    name: string
  }
  emailVerified: boolean
  dob: string
  isActive: number
}

type StaffIndex = keyof Staff

const StaffList: React.FC = () => {
  const { notification } = App.useApp()
  const [loading, error, response] = useFetchData(`/users/role/3`)
  const [data, setData] = useState<Staff[]>([])
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleDelete = async (id: number) => {
    const response = await deleteUserAPI(id)
    if (response) {
      setData((prevData) => prevData.filter((bird) => bird.id !== id))
      notification.success({ message: 'Xóa chim thành công' })
    } else {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: StaffIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex: StaffIndex): ColumnType<Staff> => ({
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
  const columns: ColumnsType<Staff> = [
    {
      title: 'Nhân viên',
      dataIndex: 'fullName',
      ...getColumnSearchProps('fullName'),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      width: '20%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: '30%'
    },

    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      sorter: (a, b) => a.isActive - b.isActive,
      render: (_, record) => {
        if (record.isActive === 1) {
          return <p>Hoạt động</p>
        } else if (record.isActive === 0) {
          return <p>Nghỉ làm</p>
        } else if (record.isActive === 2) {
          return <p>Nghỉ phép</p>
        }
      }
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
            <DeleteButton onDelete={() => handleDelete(record.id)} />
          </Row>
        </Space>
      ),
      width: '20%'
    }
  ]
  const onChange: TableProps<Staff>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  useEffect(() => {
    if (!loading && !error && response) {
      setData(response.data)
    }
  }, [loading, error, response])
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
              {error ? (
                <Result title='Failed to fetch' subTitle={error} status='error' />
              ) : (
                <Table
                  loading={loading}
                  style={{ minHeight: 300 }}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
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

export default StaffList

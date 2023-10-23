import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input, Result } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { ColumnFilterItem, FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'
import BirdDetail from '~/application/components/birdList/birdDetail'
import { useNavigate } from 'react-router-dom'
import useFetchData from '~/application/hooks/useFetchData'

const { Title, Link } = Typography

interface DataType {
  id: number
  name: string
  stock: number
  category: string
  price: number
}

type DataIndex = keyof DataType

const BirdList: React.FC = () => {
  const limit = 10
  const page = 1
  const [loading, error, response] = useFetchData(`/bird?page=${page}&limit=${limit}`)
  const data: DataType[] = response ? response.data.birds : []
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const filter: ColumnFilterItem[] = Array.from(new Set(data.map((item) => item.category))).map((category) => ({
    value: category,
    text: category
  }))

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
      title: 'Tên',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      filters: filter,
      // filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => record.category.includes(value as string),
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: 'Loài chim',
      dataIndex: 'category',
      filters: filter,
      // filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => record.category.includes(value as string),
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      sorter: (a, b) => a.stock - b.stock
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (_, { price }) => {
        return formatCurrencyVND(price)
      }
    },
    {
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <BirdDetail id={record.id} />
          <Link type='danger' href='https://ant.design' target='_blank'>
            Delete
          </Link>
        </Space>
      )
    }
  ]
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách chim</Title>
          <Button
            onClick={() => navigate('/addbird')}
            type='primary'
            icon={<PlusOutlined />}
            shape='round'
            size='large'
          >
            Thêm chim
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
                  pagination={{ pageSize: limit }}
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

export default BirdList

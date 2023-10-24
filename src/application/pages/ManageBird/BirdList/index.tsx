import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input, Result } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { ColumnFilterItem, FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'
import BirdDetail from '~/application/components/birdList/birdDetail'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useFetchData from '~/application/hooks/useFetchData'

const { Title, Link } = Typography

type BirdImage = {
  id: number
  imageUrl: string
}

type Bird = {
  createdAt: Date
  updatedAt: Date
  id: number
  name: string
  price: number
  thumbnail: string
  description: string
  category: {
    id: number
    name: string
  }
  birdType: {
    id: number
    name: string
  }
  status: boolean
  purebredLevel: string
  competitionAchievements: number
  age: string
  gender: string
  color: string
  quantity: number
  birdImages: BirdImage[]
}

type BirdIndex = keyof Bird

const BirdList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 10
  const [loading, error, response] = useFetchData(`/birds?page=${page - 1}&limit=${limit}`)
  const totalPages = response ? response.data.totalPages : 0
  const data: Bird[] = response ? response.data.birds : []
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const filterCategory: ColumnFilterItem[] = Array.from(new Set(data.map((item) => item.category.name))).map(
    (category) => ({
      value: category,
      text: category
    })
  )
  const filterBirdType: ColumnFilterItem[] = Array.from(new Set(data.map((item) => item.birdType.name))).map(
    (birdtype) => ({
      value: birdtype,
      text: birdtype
    })
  )

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: BirdIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex: BirdIndex): ColumnType<Bird> => ({
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
  const columns: ColumnsType<Bird> = [
    {
      title: 'Tên',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      filters: filterCategory,
      // filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => record.category.name.includes(value as string),
      sorter: (a, b) => a.category.name.localeCompare(b.category.name),
      render: (_, { category }) => category.name
    },
    {
      title: 'Loài chim',
      dataIndex: 'birdType',
      filters: filterBirdType,
      // filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => record.birdType.name.includes(value as string),
      sorter: (a, b) => a.birdType.name.localeCompare(b.birdType.name),
      render: (_, { birdType }) => birdType.name
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity
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
  const onChange: TableProps<Bird>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
    const currentPage = pagination.current!
    setSearchParams(`page=${currentPage}&limit=${limit}`)
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
                  pagination={{ pageSize: limit, total: totalPages * limit, current: page }}
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

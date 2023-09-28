import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input } from 'antd'
import { PlusOutlined, StarFilled, SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { ColumnFilterItem, FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { formatCurrencyVND } from '~/utils/numberUtils'

const { Title, Link } = Typography

interface DataType {
  id: number
  name: string
  stock: number
  category: string
  price: number
  rating: number
}

type DataIndex = keyof DataType

const dataTable: DataType[] = [
  {
    name: 'Parakeet',
    category: 'Pet',
    stock: 20,
    price: 10.5,
    rating: 0,
    id: 1
  },
  {
    name: 'Canary',
    category: 'Wild',
    stock: 15,
    price: 8.99,
    rating: 3,
    id: 2
  },
  {
    name: 'Chicken',
    category: 'Exotic',
    stock: 30,
    price: 5.75,
    rating: 4,
    id: 3
  },
  {
    name: 'Duck',
    category: 'Poultry',
    stock: 25,
    price: 7.25,
    rating: 4,
    id: 4
  },
  {
    name: 'Ostrich',
    category: 'Exotic',
    stock: 12,
    price: 50,
    rating: 5,
    id: 5
  },
  {
    name: 'Penguin',
    category: 'Poultry',
    stock: 8,
    price: 75,
    rating: 5,
    id: 6
  },
  {
    name: 'Eagle',
    category: 'Bird of Prey',
    stock: 5,
    price: 100,
    rating: 5,
    id: 7
  },
  {
    name: 'Hummingbird',
    category: 'Wild',
    stock: 18,
    price: 12.5,
    rating: 4,
    id: 8
  },
  {
    name: 'Pelican',
    category: 'Pet',
    stock: 10,
    price: 15.99,
    rating: 3,
    id: 9
  },
  {
    name: 'Flamingo',
    category: 'Wild',
    stock: 7,
    price: 20,
    rating: 4,
    id: 10
  },
  {
    name: 'Giraffe',
    category: 'Exotic',
    stock: 4,
    price: 150,
    rating: 4,
    id: 11
  },
  {
    name: 'Kangaroo',
    category: 'Exotic',
    stock: 6,
    price: 80,
    rating: 3,
    id: 12
  },
  {
    name: 'Elephant',
    category: 'Exotic',
    stock: 2,
    price: 300,
    rating: 5,
    id: 13
  },
  {
    name: 'Lion',
    category: 'Wild',
    stock: 3,
    price: 200,
    rating: 4,
    id: 14
  },
  {
    name: 'Tiger',
    category: 'Wild',
    stock: 5,
    price: 250,
    rating: 4,
    id: 15
  },
  {
    name: 'Leopard',
    category: 'Wild',
    stock: 3,
    price: 180,
    rating: 4,
    id: 16
  },
  {
    name: 'Zebra',
    category: 'Exotic',
    stock: 7,
    price: 120,
    rating: 3,
    id: 17
  },
  {
    name: 'Panda',
    category: 'Wild',
    stock: 2,
    price: 350,
    rating: 5,
    id: 18
  },
  {
    name: 'Rhino',
    category: 'Exotic',
    stock: 1,
    price: 400,
    rating: 4,
    id: 19
  },
  {
    name: 'Hippopotamus',
    category: 'Exotic',
    stock: 2,
    price: 280,
    rating: 4,
    id: 20
  }
]

const BirdList: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const filter: ColumnFilterItem[] = Array.from(new Set(dataTable.map((item) => item.category))).map((category) => ({
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
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: filter,
      // filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => record.category.includes(value as string),
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: (a, b) => a.stock - b.stock
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (_, { price }) => {
        return formatCurrencyVND(price)
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (_, { rating }) => {
        return (
          <div className='flex flex-row items-center gap-1'>
            {rating === 0 ? <StarFilled /> : <StarFilled className='!text-orange-500' />}
            <span>{rating.toPrecision(2)}</span>
          </div>
        )
      }
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
          <Button type='primary' icon={<PlusOutlined />} shape='round' size='large'>
            Thêm chim
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

export default BirdList

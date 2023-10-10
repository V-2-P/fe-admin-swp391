import React, { useRef, useState } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input } from 'antd'
import { SearchOutlined, StarFilled } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import FeedbackDetail from '~/application/components/feedbackList/feedbackDetail'
const { Title, Link, Paragraph } = Typography

interface DataType {
  id: string
  orderId: string
  birdId: string
  birdName: string
  rating: number
  content: string
  status: string
  customer: string
}

type DataIndex = keyof DataType

const dataTable: DataType[] = [
  {
    id: '1',
    orderId: 'ORD123',
    birdId: 'BIRD001',
    birdName: 'Bird One',
    rating: 4,
    content: 'Great service!',
    status: 'Hiện',
    customer: 'Customer A'
  },
  {
    id: '2',
    orderId: 'ORD124',
    birdId: 'BIRD002',
    birdName: 'Bird Two',
    rating: 5,
    content: 'Fast delivery and friendly bird!',
    status: 'Hiện',
    customer: 'Customer B'
  },
  {
    id: '3',
    orderId: 'ORD125',
    birdId: 'BIRD003',
    birdName: 'Bird Three',
    rating: 3,
    content: 'Good service but delayed delivery',
    status: 'Ẩn',
    customer: 'Customer C'
  },
  {
    id: '4',
    orderId: 'ORD126',
    birdId: 'BIRD004',
    birdName: 'Bird Four',
    rating: 4,
    content: 'Satisfied with the delivery',
    status: 'Hiện',
    customer: 'Customer D'
  },
  {
    id: '5',
    orderId: 'ORD127',
    birdId: 'BIRD005',
    birdName: 'Bird Five',
    rating: 2,
    content: 'Late delivery and poor service',
    status: 'Ẩn',
    customer: 'Customer E'
  },
  {
    id: '6',
    orderId: 'ORD128',
    birdId: 'BIRD006',
    birdName: 'Bird Six',
    rating: 5,
    content: 'Excellent service!',
    status: 'Hiện',
    customer: 'Customer F'
  },
  {
    id: '7',
    orderId: 'ORD129',
    birdId: 'BIRD007',
    birdName: 'Bird Seven',
    rating: 4,
    content: 'Fast and reliable delivery',
    status: 'Hiện',
    customer: 'Customer G'
  },
  {
    id: '8',
    orderId: 'ORD130',
    birdId: 'BIRD008',
    birdName: 'Bird Eight',
    rating: 3,
    content: 'Average service',
    status: 'Ẩn',
    customer: 'Customer H'
  },
  {
    id: '9',
    orderId: 'ORD131',
    birdId: 'BIRD009',
    birdName: 'Bird Nine',
    rating: 4,
    content: 'Satisfied with the delivery',
    status: 'Hiện',
    customer: 'Customer I'
  },
  {
    id: '10',
    orderId: 'ORD132',
    birdId: 'BIRD010',
    birdName: 'Bird Ten',
    rating: 5,
    content: 'Excellent service and fast delivery!',
    status: 'Hiện',
    customer: 'Customer J'
  }
]

const FeedbackList: React.FC = () => {
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
      title: 'Mã chim',
      dataIndex: 'birdId',
      ...getColumnSearchProps('birdId'),
      sorter: (a, b) => a.birdId.localeCompare(b.birdId)
    },
    {
      title: 'Chim',
      dataIndex: 'birdName',
      ...getColumnSearchProps('birdName'),
      sorter: (a, b) => a.birdName.localeCompare(b.birdName)
    },
    {
      title: 'Số sao',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (_, { rating }) => {
        return (
          <div className='flex flex-row gap-1 items-center justify-center'>
            {rating === 0 ? <StarFilled /> : <StarFilled className='!text-orange-500' />}
            <span>{rating.toPrecision(2)}</span>
          </div>
        )
      },
      filters: [
        {
          text: '5 sao',
          value: 5
        },
        {
          text: '4 sao',
          value: 4
        },
        {
          text: '3 sao',
          value: 3
        },
        {
          text: '2 sao',
          value: 2
        },
        {
          text: '1 sao',
          value: 1
        },
        {
          text: '0 sao',
          value: 0
        }
      ],
      onFilter: (value, record) => record.rating === value,
      align: 'center'
    },
    {
      title: 'Đánh giá',
      dataIndex: 'content',
      render: (_, { content }) => {
        return <Paragraph ellipsis={{ rows: 3 }}>{content}</Paragraph>
      },
      width: '30%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      align: 'center'
    },
    {
      title: 'Người đánh giá',
      dataIndex: 'customer',
      sorter: (a, b) => a.customer.localeCompare(b.customer)
    },
    {
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size='middle'>
          <FeedbackDetail id={record.id} />
          <Link type='danger' href='https://ant.design' target='_blank'>
            Ẩn
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
          <Title level={3}>Danh sách đánh giá</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Table
                style={{ minHeight: 300 }}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1300, y: 300 }}
                dataSource={dataTable}
                onChange={onChange}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      console.log(rowIndex)
                      console.log(record)
                    }
                  }
                }}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default FeedbackList

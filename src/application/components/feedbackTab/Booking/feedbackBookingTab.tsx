import { Button, Card, Input, InputRef, Result, Space, TableProps, Typography } from 'antd'
import Table, { ColumnType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { SearchOutlined, StarFilled } from '@ant-design/icons'
import useFetchData from '~/application/hooks/useFetchData'
import { ColumnsType } from 'antd/lib/table'
import FeedbackDetail from '../Order/feedbackOrderDetail'
const { Paragraph } = Typography

interface DataType {
  createdAt: string
  updatedAt: string
  id: number
  fullName: string
  bookingTime: string
  phoneNumber: string
  shippingAddress: string
  paymentMethod: string
  paymentDeposit: number
  totalPayment: number
}

interface Booking {
  createdAt: string
  rating: number
  comment: string
  isActive: number
  booking: DataType
  id: number
}

type DataIndex = keyof Booking

const FeedbackBookingTab: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [feedbackLoading, feedbackError, feedbackResponse] = useFetchData('/feedbackbooking')
  console.log(feedbackResponse)
  const searchInput = useRef<InputRef>(null)
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Booking> => ({
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
  const onChange: TableProps<Booking>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
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

  const columns: ColumnsType<Booking> = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt)
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
      dataIndex: 'comment',
      render: (_, { comment }) => {
        return <Paragraph ellipsis={{ rows: 3 }}>{comment}</Paragraph>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: (a, b) => a.isActive.toString().localeCompare(b.isActive.toString()),
      render: (_, record) => {
        console.log(record)
        return <Paragraph ellipsis={{ rows: 3 }}>{record.isActive ? 'Đang hiện' : 'Đã ẩn'}</Paragraph>
      },
      align: 'center'
    },
    {
      title: 'Người đánh giá',
      dataIndex: 'booking.fullName',
      sorter: (a, b) => a.booking.fullName.localeCompare(b.booking.fullName)
    },
    {
      key: 'action',
      fixed: 'right',
      width: '10%',
      render: (_, record) => (
        <Space size='middle'>
          <FeedbackDetail id={record.id} />
          <Button type='link' target='_blank'>
            Ẩn
          </Button>
        </Space>
      )
    }
  ]
  return (
    <Card bordered={false}>
      {feedbackError ? (
        <Result title='Failed to fetch' subTitle={feedbackError} status='error' />
      ) : (
        <Table
          loading={feedbackLoading}
          style={{ minHeight: 300 }}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1300, y: 300 }}
          dataSource={feedbackResponse ? feedbackResponse.data : []}
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
      )}
    </Card>
  )
}

export default FeedbackBookingTab

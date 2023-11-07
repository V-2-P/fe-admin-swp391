import { Button, Card, Input, InputRef, Result, Space, Table, Typography, notification } from 'antd'
import { ColumnType, ColumnsType } from 'antd/es/table'
import { TableProps } from 'antd/lib'
import React, { useRef, useState } from 'react'
import useFetchData from '~/application/hooks/useFetchData'
import FeedbackDetail from './feedbackOrderDetail'
import Highlighter from 'react-highlight-words'
import { FilterConfirmProps } from 'antd/es/table/interface'
import { SearchOutlined, StarFilled } from '@ant-design/icons'
import { useAppDispatch } from '~/application/hooks/reduxHook'
import { reFetchData } from '~/redux/slices'
import { hiddenFeedbackByIdAPI } from '~/utils/api/feedback/function'
const { Paragraph } = Typography

interface DataType {
  id: number
  birdId: number
  userImage: string
  birdName: string
  rating: number
  comment: string
  birdType: string
  orderId: number
  fullName: string
  address: string
  phoneNumber: string
  status: boolean
  createdAt: string
}
type DataIndex = keyof DataType

const FeedbackOrderTab: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [feedbackLoading, feedbackError, feedbackResponse] = useFetchData('/feedbackbirds')
  const searchInput = useRef<InputRef>(null)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
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
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt)
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
      dataIndex: 'comment',
      render: (_, { comment }) => {
        return (
          <Paragraph className='!m-0' ellipsis={{ rows: 3 }}>
            {comment}
          </Paragraph>
        )
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: (a, b) => a.status.toString().localeCompare(b.status.toString()),
      render: (_, record) => {
        console.log(record)
        return (
          <Paragraph className='!m-0' ellipsis={{ rows: 3 }}>
            {record.status ? 'Đang hiện' : 'Đã ẩn'}
          </Paragraph>
        )
      },
      align: 'center'
    },
    {
      title: 'Người đánh giá',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      key: 'action',
      fixed: 'right',
      width: '10%',
      render: (_, record) => (
        <Space size='middle'>
          <FeedbackDetail id={record.id} />
          <Button type='link' loading={loading} onClick={() => hiddenFeedback(record.id)} target='_blank'>
            Ẩn
          </Button>
        </Space>
      )
    }
  ]
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
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

  const hiddenFeedback = async (id: any) => {
    setLoading(true)
    try {
      const response = await hiddenFeedbackByIdAPI(id)
      setLoading(false)
      if (response) {
        notification.success({ message: 'Sửa voucher thành công' })
        dispatch(reFetchData())
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

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
export default FeedbackOrderTab

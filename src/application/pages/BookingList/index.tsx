import { Button, Card, Col, Input, InputRef, Result, Row, Space, Tag, Typography } from 'antd'
import Table, { ColumnType, TableProps } from 'antd/es/table'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import useFetchData from '~/application/hooks/useFetchData'
import { SearchOutlined } from '@ant-design/icons'
import { ColumnFilterItem, FilterConfirmProps } from 'antd/es/table/interface'
import { ColumnsType } from 'antd/lib/table'
import { formatCurrencyVND } from '~/utils/numberUtils'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
import BookingDetailModal from '~/application/components/bookingList/bookingDetail'
import { Booking, BookingStatus } from '~/utils/api/booking'
import { getBookingStatus } from '~/utils/statusUtils'
import UpdateBookingStatus from '~/application/components/bookingList/updateBookingStatus'
import ConfirmButton from '~/application/components/bookingList/confirmButton'
const { Title } = Typography

type DataIndex = keyof Booking

const BookingList: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [loadingBooking, errorBooking, responseBooking] = useFetchData('/booking')
  const searchInput = useRef<InputRef>(null)

  const filterStatus: ColumnFilterItem[] = [
    {
      value: BookingStatus.pending,
      text: getBookingStatus(BookingStatus.pending).name
    },
    {
      value: BookingStatus.preparing,
      text: getBookingStatus(BookingStatus.preparing).name
    },
    {
      value: BookingStatus.shipping,
      text: getBookingStatus(BookingStatus.shipping).name
    },
    {
      value: BookingStatus.delivered,
      text: getBookingStatus(BookingStatus.delivered).name
    },
    {
      value: BookingStatus.cancelled,
      text: getBookingStatus(BookingStatus.cancelled).name
    },
    {
      value: BookingStatus.confirmed,
      text: getBookingStatus(BookingStatus.confirmed).name
    }
  ]
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
  const columns: ColumnsType<Booking> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      align: 'right'
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (_, { createdAt }) => {
        return formatDateToDDMMYYYY(new Date(createdAt))
      },
      align: 'right',
      defaultSortOrder: 'descend'
    },
    {
      title: 'Người đặt',
      dataIndex: 'fullName',
      ...getColumnSearchProps('fullName'),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      align: 'right'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: filterStatus,
      onFilter: (value: any, record) => record.status.includes(value as string),
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (_, record) =>
        record.status === BookingStatus.pending ? (
          <Tag bordered={false} color={getBookingStatus(record.status).color} className='!w-full !text-center'>
            Chờ thanh toán
          </Tag>
        ) : (
          <UpdateBookingStatus status={record.status} id={record.id} bookingDetail={record.bookingDetail} />
        ),
      align: 'center'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPayment',
      sorter: (a, b) => a.id - b.id,
      render: (_, record) => formatCurrencyVND(record.totalPayment),
      align: 'right'
    },
    {
      key: 'action',
      width: '15%',
      render: (_, record) => (
        <Space size='middle'>
          {record.status === BookingStatus.confirmed && record.bookingDetail.status === 'Waiting' && (
            <ConfirmButton id={record.bookingDetail.id} />
          )}

          <BookingDetailModal id={record.id} />
        </Space>
      ),
      align: 'left'
    }
  ]
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

  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách đơn lai chim</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              {errorBooking ? (
                <Result title='Failed to fetch' subTitle={errorBooking} status='error' />
              ) : (
                <Table
                  rowKey={'id'}
                  loading={loadingBooking}
                  style={{ minHeight: 300 }}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 800, y: 300 }}
                  dataSource={responseBooking ? responseBooking.data : []}
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

export default BookingList

import { Button, Card, Col, Input, InputRef, Modal, Row, Space, TableProps, notification } from 'antd'
import Table, { ColumnType, ColumnsType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { getBookingByUserIdAPI } from '~/utils/api/booking'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
type BookingListTypeByUserId = {
  id: number
}

interface Booking {
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

type DataIndex = keyof Booking

const CustomerBooking: React.FC<BookingListTypeByUserId> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Booking[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const showModal = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setLoading(true)
    try {
      const response = await getBookingByUserIdAPI(id)
      setLoading(false)
      if (response) {
        setData(response.data)
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }
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
  const handleOk = () => {
    setOpen(false)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const columns: ColumnsType<Booking> = [
    {
      title: 'Mã',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      width: '20%'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      width: '20%'
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      width: '20%'
    },
    {
      title: 'Phương thức đặt hàng',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
      width: '30%'
    },
    {
      title: 'Tiền cọc',
      dataIndex: 'paymentDeposit',
      width: '15%'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPayment',
      width: '15%'
    }
  ]
  console.log(data)
  return (
    <div>
      <Button onClick={showModal} type='link'>
        Xem tổng đơn lai chim
      </Button>
      <Modal
        title={`Đơn booking`}
        style={{ top: 20 }}
        width={1000}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>
        ]}
      >
        <div className='flex-grow min-h-[100%] relative'>
          <Space size='large' direction='vertical' className='w-full'>
            <Row>
              <Col span={24}>
                <Card bordered={false}>
                  <Table
                    loading={loading}
                    style={{ minHeight: 300 }}
                    columns={columns}
                    scroll={{ x: 800, y: 300 }}
                    dataSource={data}
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
      </Modal>
    </div>
  )
}

export default CustomerBooking

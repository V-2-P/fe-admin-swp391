import { Button, Card, Col, Input, InputRef, Row, Space, Table, Typography } from 'antd'
import { ColumnType, ColumnsType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import AddVoucherForm from '~/application/components/voucherList/addVoucherForm'
import UpdateVoucherForm from '~/application/components/voucherList/updateVoucherForm'
import useFetchData from '~/application/hooks/useFetchData'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
import { formatCurrencyVND, formatCurrencyVNDToString } from '~/utils/numberUtils'
import { SearchOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

interface Voucher {
  createdAt: Date
  updatedAt: Date
  id: number
  discount: number
  name: string
  amount: number
  minValue: number
  code: string
  description: string
  startDate: Date
  expirationDate: Date
  status: 'isActive' | 'expired' | 'notActivated' | 'cancelled'
}

type VoucherIndex = keyof Voucher

const VoucherList: React.FC = () => {
  const [loading, error, response] = useFetchData(`/voucher`)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  console.log(response)
  const [data, setData] = useState<Voucher[]>([])

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: VoucherIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex: VoucherIndex): ColumnType<Voucher> => ({
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

  const columns: ColumnsType<Voucher> = [
    {
      title: 'Mã voucher',
      dataIndex: 'code',
      ...getColumnSearchProps('code'),
      align: 'left'
    },
    {
      title: 'Tên voucher',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      align: 'left'
    },
    {
      title: 'Ngày phát hành',
      dataIndex: 'createdAt',
      render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
      align: 'left'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expirationDate',
      render: (_, { expirationDate }) => formatDateToDDMMYYYY(new Date(expirationDate)),
      align: 'left'
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'startDate',
      render: (_, { startDate }) => formatDateToDDMMYYYY(new Date(startDate)),
      align: 'left'
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      render: (_, { amount }) => formatCurrencyVNDToString(amount),
      align: 'center'
    },
    {
      title: 'Mệnh giá',
      dataIndex: 'discount',
      render: (_, { discount }) => formatCurrencyVND(discount),
      align: 'center'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        let status
        if (record.status === 'isActive') {
          status = 'Kích hoạt'
        } else if (record.status === 'expired') {
          status = 'Hết hạn'
        } else if (record.status === 'notActivated') {
          status = 'Chưa kích hoạt'
        } else {
          status = 'Hủy bỏ'
        }
        return <Paragraph className='!m-0'>{status}</Paragraph>
      },
      align: 'left'
    }
  ]

  useEffect(() => {
    if (!loading && !error && response) {
      setData(response.data)
    }
  }, [loading, error, response])
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full h-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách voucher</Title>
          <AddVoucherForm />
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Table
                rowKey={'id'}
                style={{ minHeight: 800 }}
                // scroll={{ x: 800, y: 1200 }}
                pagination={false}
                columns={columns}
                dataSource={data}
                rowClassName='cursor-pointer'
                expandable={{
                  columnWidth: 0,
                  expandIcon: () => <></>,
                  expandRowByClick: true,
                  expandedRowRender: (record) => <UpdateVoucherForm voucher={record} />
                }}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}
export default VoucherList

import { Card, Col, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import AddVoucherForm from '~/application/components/voucherList/addVoucherForm'
import UpdateVoucherForm from '~/application/components/voucherList/updateVoucherForm'
import useFetchData from '~/application/hooks/useFetchData'
import { formatDateToDDMMYYYY } from '~/utils/dateUtils'
import { formatCurrencyVND, formatCurrencyVNDToString } from '~/utils/numberUtils'

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
  status: boolean
}

const columns: ColumnsType<Voucher> = [
  {
    title: 'Mã voucher',
    dataIndex: 'code',
    align: 'right'
  },
  {
    title: 'Tên voucher',
    dataIndex: 'name',
    align: 'right'
  },
  {
    title: 'Ngày phát hành',
    dataIndex: 'createdAt',
    render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
    align: 'right'
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expirationDate',
    render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
    align: 'right'
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'startDate',
    render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
    align: 'right'
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
    render: (_, { amount }) => formatCurrencyVNDToString(amount),
    align: 'right'
  },
  {
    title: 'Mệnh giá',
    dataIndex: 'discount',
    render: (_, { discount }) => formatCurrencyVND(discount),
    align: 'right'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (_, record) => {
      console.log(record)
      return <Paragraph ellipsis={{ rows: 3 }}>{record.status ? 'Kích hoạt' : 'Chưa kích hoạt'}</Paragraph>
    },
    align: 'left'
  }
]

const VoucherList: React.FC = () => {
  const [loading, error, response] = useFetchData(`/voucher`)
  const [data, setData] = useState<Voucher[]>([])

  useEffect(() => {
    if (!loading && !error && response) {
      setData(response.data)
    }
  }, [loading, error, response])
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
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

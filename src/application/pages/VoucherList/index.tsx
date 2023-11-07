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
  status: 'isActive' | 'expired' | 'notActivated' | 'cancelled'
}

const columns: ColumnsType<Voucher> = [
  {
    title: 'Mã voucher',
    dataIndex: 'code',
    align: 'left'
  },
  {
    title: 'Tên voucher',
    dataIndex: 'name',
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
    render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
    align: 'left'
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'startDate',
    render: (_, { createdAt }) => formatDateToDDMMYYYY(new Date(createdAt)),
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

const VoucherList: React.FC = () => {
  const [loading, error, response] = useFetchData(`/voucher`)
  console.log(response)
  const [data, setData] = useState<Voucher[]>([])

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

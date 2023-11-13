// import { App, Card, Col, Row, Space, Table, Typography } from 'antd'
// import { ColumnsType } from 'antd/es/table'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useAppDispatch } from '~/application/hooks/reduxHook'
// import { reFetchData } from '~/redux/slices'
// import { Booking, BookingDetail, getBookingByIdAPI, updateBookingStatusAPI } from '~/utils/api/booking'
// import { formatCurrencyVND } from '~/utils/numberUtils'
// const { Title, Text } = Typography

const BookingDelivery: React.FC = () => {
  //   const { id } = useParams()
  //   const { notification } = App.useApp()
  //   const dispatch = useAppDispatch()
  //   const [data, setData] = useState<Booking>()

  //   const columns: ColumnsType<Booking> = [
  //     {
  //       title: 'Mã đơn',
  //       dataIndex: 'id'
  //     },
  //     {
  //       title: 'Ngày tạo',
  //       dataIndex: 'createdAt ',
  //       align: 'right'
  //     }
  //   ]
  //   const onFinish = async () => {
  //     try {
  //       const response = await updateBookingStatusAPI(Number(id), 'Shipping')
  //       if (response) {
  //         notification.success({ message: `Cập nhật thành công` })
  //         dispatch(reFetchData())
  //       } else {
  //         notification.error({ message: 'Sorry! Something went wrong. App server error' })
  //       }
  //     } catch (err) {
  //       notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
  //     }
  //   }
  //   useEffect(() => {
  //     const fetchUser = async (id: number) => {
  //       const res = await getBookingByIdAPI(id)
  //       const data: Booking = res.data
  //       if (data) {
  //         setData(data)
  //       }
  //       console.log(data)
  //     }
  //     if (id) {
  //       fetchUser(Number(id))
  //     }
  //   }, [data, id])
  return (
    //     <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
    //       <Space size='large' direction='vertical' className='w-full'>
    //         <div className='flex flex-row justify-between items-center'>
    //           <Title level={3}>Giao hàng</Title>
    //         </div>
    //         <Row>
    //           <Col span={24}>
    //             <Card bordered={false}>
    //               {/* <Form
    //                 form={form}
    //                 name='delivery'
    //                 labelCol={{ span: 8 }}
    //                 labelAlign='left'
    //                 wrapperCol={{ span: 16 }}
    //                 style={{ width: '100%' }}
    //                 onFinish={onFinish}
    //                 onFinishFailed={onFinishFailed}
    //                 autoComplete='off'
    //               >
    //                 <Form.Item<DeliveryFieldType>
    //                   label='Mã đơn hàng'
    //                   name='inputOrderId'
    //                   rules={[{ required: true, message: 'Vui lòng chọn mã đơn hàng!' }]}
    //                 > */}
    //               {/* <DebounceSelect
    //                     showSearch
    //                     placeholder='Chọn mã đơn hàng'
    //                     fetchOptions={fetchUserList}
    //                     onChange={(newValue) => handleChangeData(newValue as OptionType[])}
    //                     size='large'
    //                     tokenSeparators={[',']}
    //                     style={{ width: '100%' }}
    //                   /> */}
    //               {/* </Form.Item>
    //                 <Form.Item wrapperCol={{ span: 24 }}> */}
    //               <Table
    //                 columns={columns}
    //                 dataSource={data}
    //                 pagination={false}
    //                 bordered
    //                 summary={() => {
    //                   return (
    //                     <>
    //                       <Table.Summary.Row>
    //                         <Table.Summary.Cell index={0} colSpan={2} align='right'>
    //                           <b>Tồng tiền hàng:</b>
    //                         </Table.Summary.Cell>
    //                         <Table.Summary.Cell index={1} colSpan={2} align='right'>
    //                           <Text>{formatCurrencyVND(data?.paymentDeposit)}</Text>
    //                         </Table.Summary.Cell>
    //                       </Table.Summary.Row>
    //                       <Table.Summary.Row>
    //                         <Table.Summary.Cell index={0} colSpan={2} align='right'>
    //                           <b>Thành tiền:</b>
    //                         </Table.Summary.Cell>
    //                         <Table.Summary.Cell index={1} colSpan={2} align='right'>
    //                           <Text>{formatCurrencyVND(data?.totalPayment)}</Text>
    //                         </Table.Summary.Cell>
    //                       </Table.Summary.Row>
    //                     </>
    //                   )
    //                 }}
    //               />
    //               {/* </Form.Item>

    //                 <Form.Item<DeliveryFieldType> name='deliveryBy' label='Phương thức vận chuyển'>
    //                   <Input size='large' disabled placeholder='Vui lòng chọn phương thức vận chuyển' />
    //                 </Form.Item>
    //                 <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
    //                   <Button loading={isButtonLoading} type='primary' htmlType='submit' className='w-full' size='large'>
    //                     Xác nhận
    //                   </Button>
    //                 </Form.Item>
    //               </Form> */}
    //             </Card>
    //           </Col>
    //         </Row>
    //       </Space>
    //     </div>
    <></>
  )
}

export default BookingDelivery

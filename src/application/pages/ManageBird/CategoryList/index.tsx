import React, { useRef, useState, useEffect } from 'react'
import { Space, Typography, Button, Row, Col, Card, Table, Input, Result, Form, App } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import useFetchData from '~/application/hooks/useFetchData'
import { AddCategoryPayload, addCategoryAPI, deleteCategoryAPI } from '~/utils/api'
import DeleteButton from '~/application/components/shared/DeleteButton'

const { Title } = Typography

interface DataType {
  id: number
  name: string
}

type DataIndex = keyof DataType

const CategoryList: React.FC = () => {
  const [loading, error, response] = useFetchData(`/category`)
  const [data, setData] = useState<DataType[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [addLoading, setAddLoading] = useState(false)
  const [form] = Form.useForm()
  const { notification, message } = App.useApp()

  const onFinish = async (values: AddCategoryPayload) => {
    setAddLoading(true)
    const payload: AddCategoryPayload = {
      name: values.name
    }

    try {
      const response = await addCategoryAPI(payload)
      setAddLoading(false)
      if (response) {
        notification.success({ message: 'Thêm danh mục thành công' })
        form.resetFields()
        setData((prevData) => [response.data, ...prevData])
      } else {
        notification.error({ message: 'Sorry! Something went wrong. App server error' })
      }
    } catch (err) {
      setAddLoading(false)
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.error(errorInfo.errorFields[i].errors[0])
      return
    }
  }

  const handleDelete = async (id: number) => {
    const response = await deleteCategoryAPI(id)
    if (response) {
      setData((prevData) => prevData.filter((bird) => bird.id !== id))
      notification.success({ message: 'Xóa chim thành công' })
    } else {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
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
      title: 'Tên',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      key: 'action',
      render: (_, record) => <DeleteButton onDelete={() => handleDelete(record.id)} />
    }
  ]
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  useEffect(() => {
    if (!loading && !error) {
      setData(response.data)
    }
  }, [loading, error, response])
  return (
    <div className='flex-grow min-h-[100%] relative px-4 lg:pr-8 lg:pl-3'>
      <Space size='large' direction='vertical' className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <Title level={3}>Danh sách danh mục</Title>
        </div>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              <Form
                name='addcategory'
                labelCol={{ span: 8 }}
                labelAlign='left'
                wrapperCol={{ span: 16 }}
                style={{ width: '100%' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                form={form}
              >
                <Form.Item<AddCategoryPayload>
                  label='Tên danh mục'
                  name='name'
                  rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
                >
                  <Input size='large' placeholder='Vui lòng nhập danh mục' />
                </Form.Item>

                <Form.Item wrapperCol={{ sm: { span: 4, offset: 20 } }}>
                  <Button type='primary' loading={addLoading} htmlType='submit' className='w-full' size='large'>
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card bordered={false}>
              {error ? (
                <Result title='Failed to fetch' subTitle={error} status='error' />
              ) : (
                <Table
                  loading={loading}
                  style={{ minHeight: 300 }}
                  columns={columns}
                  pagination={false}
                  virtual
                  scroll={{ x: 800, y: 300 }}
                  dataSource={data}
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

export default CategoryList

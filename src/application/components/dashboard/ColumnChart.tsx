import React from 'react'

import { Column, ColumnConfig } from '@ant-design/plots'

type ColumnChartProp = {
  data: any[]
}

const ColumnChart: React.FC<ColumnChartProp> = ({ data }) => {
  const config: ColumnConfig = {
    data,
    xField: 'day',
    yField: 'money',
    tooltip: {
      // customContent: (title: string, data: any[]) => {
      //   return '1'
      // }
      formatter: (datum: any) => {
        return {
          name: 'Thu nhập',
          value: datum.money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        }
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    }
  }
  return <Column {...config} />
}

export default ColumnChart

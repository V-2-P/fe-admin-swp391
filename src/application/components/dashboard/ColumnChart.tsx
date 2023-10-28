import React from 'react'

import { Column, ColumnConfig } from '@ant-design/plots'
import { WeeklyRevenueItem } from '~/utils/api'
import { formatCurrencyVND } from '~/utils/numberUtils'

type ColumnChartProp = {
  data: WeeklyRevenueItem[]
}

const ColumnChart: React.FC<ColumnChartProp> = ({ data }) => {
  const config: ColumnConfig = {
    data,
    xField: 'day',
    yField: 'totalPayment',
    tooltip: {
      // customContent: (title: string, data: any[]) => {
      //   return '1'
      // }
      formatter: (datum) => {
        return {
          name: 'Thu nhập',
          value: formatCurrencyVND(datum.totalPayment)
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

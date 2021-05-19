/* 折线图 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import * as echarts from 'echarts'
import { createFromIconfontCN } from '@ant-design/icons'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 唯一的模块导出
---------------------------------------------------------------- */
function Line() {
  const [myChart, setMyChart] = useState(null)

  const initChartData = myChart => {
    const data = [
      ['title', '销量', '库存'],
      ['衬衫', 43.3, 85.8],
      ['羊毛衫', 83.1, 73.4],
      ['雪纺衫', 86.4, 65.2],
      ['高跟鞋', 72.4, 39.1],
      ['袜子', 72.4, 53.9]
    ]

    let option
    option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: data
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'line' }, { type: 'line' }]
    }
    option && myChart.setOption(option)
  }

  useEffect(() => {
    const chartDom = document.getElementById('chart-line')
    const myChart = echarts.init(chartDom)
    setMyChart(myChart)
  }, [])

  useEffect(() => {
    if (myChart) {
      initChartData(myChart)

      window.addEventListener('resize', () => {
        myChart.resize()
      })

      return () => {
        window.removeEventListener('resize', () => {
          myChart.resize()
        })
      }
    }
  }, [myChart])

  return (
    <Card
      size='small'
      title={
        <>
          <Icon type='icon-chart-line' />
          <span style={{ marginLeft: 10 }}>折线图</span>
        </>
      }
    >
      <div id='chart-line' style={{ height: 450 }}></div>
    </Card>
  )
}

export default Line

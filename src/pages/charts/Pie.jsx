/* 饼图 */

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
    let option
    option = {
      legend: {
        top: 'bottom'
      },
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false, title: '数据视图' },
          restore: { show: true, title: '还原' },
          saveAsImage: { show: true, title: '保存' }
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: [30, 150],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: '直接访问' },
            { value: 38, name: '邮件营销' },
            { value: 32, name: '搜索引擎' },
            { value: 30, name: '视频广告' },
            { value: 28, name: '社交平台' },
            { value: 26, name: '图文广告' },
            { value: 22, name: '联盟广告' }
          ]
        }
      ]
    }
    option && myChart.setOption(option)
  }

  useEffect(() => {
    const chartDom = document.getElementById('chart-pie')
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
          <Icon type='icon-chart-pie' />
          <span style={{ marginLeft: 10 }}>饼图</span>
        </>
      }
    >
      <div id='chart-pie' style={{ height: 450 }}></div>
    </Card>
  )
}

export default Line

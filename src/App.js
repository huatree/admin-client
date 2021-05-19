/* 应用页面入口 */

/* 调用模块
---------------------------------------------------------------- */
import React  from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

/* 路由模块
---------------------------------------------------------------- */
import renderRoutes from './router'
import routes from 'config/routes'


/* 唯一的模块导出
---------------------------------------------------------------- */
function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      // componentSize={'small'}
    >
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

/* 应用页面入口 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ConfigProvider } from 'antd'

/* 路由模块
---------------------------------------------------------------- */
import Login from 'pages/login'
import AdminLayout from './layout'
import ErrorPage from 'pages/404'

/* 唯一的模块导出
---------------------------------------------------------------- */
function App() {
  return (
    <ConfigProvider componentSize={'small'}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={AdminLayout} />
          <Route path='/404' component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

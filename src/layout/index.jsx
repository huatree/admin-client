/* 管理页面 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Layout } from 'antd'

/* 公共组件
---------------------------------------------------------------- */
import LeftNav from 'components/common/leftNav'
import Header from 'components/common/header'

/* 功能模块
---------------------------------------------------------------- */
import * as storageUtils from 'utils/storageUtils'
import renderRoutes from '../router'

/* 调用模块：对象解构
---------------------------------------------------------------- */
const { Sider, Content } = Layout

/* 唯一的模块导出
---------------------------------------------------------------- */
function AdminLayout(props) {
  const { route } = props
  const user = storageUtils.getUser()
  const { menus } = user.role || {}
  let routes
  if (menus) {
    routes = route.routes ? route.routes.filter(item => menus.indexOf(item.path) > -1 || item.path === '*') : null
  }

  if (!user._id) return <Redirect to='/login' />

  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      <Layout>
        <Sider style={{ background: '#fff', width: 200, height: '100%' }}>
          <LeftNav />
        </Sider>
        <Content style={{ height: ' 100%', overflow: 'hidden', overflowY: 'auto' }}>
          <Switch>
            <Redirect exact from='/' to='/home' />
            {renderRoutes(routes, true)}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout

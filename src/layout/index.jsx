/* 管理页面 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

/* 公共组件
---------------------------------------------------------------- */
import LeftNav from 'components/common/leftNav'
import Header from 'components/common/header'

/* 功能模块
---------------------------------------------------------------- */
import * as storageUtils from 'utils/storageUtils'

/* 路由组件
---------------------------------------------------------------- */
// const Home = React.lazy(() => import('pages/home'))
// const Category = React.lazy(() => import('pages/category'))
// const Product = React.lazy(() => import('pages/product'))
// const User = React.lazy(() => import('pages/user'))
// const Role = React.lazy(() => import('pages/role'))
// const Bar = React.lazy(() => import('pages/charts/Bar'))
// const Line = React.lazy(() => import('pages/charts/Line'))
// const Pie = React.lazy(() => import('pages/charts/Pie'))
// const ErrorPage = React.lazy(() => import('pages/404'))
import Home from 'pages/home'
import Category from 'pages/category'
import Product from 'pages/product'
import User from 'pages/user'
import Role from 'pages/role'
import Bar from 'pages/charts/Bar'
import Line from 'pages/charts/Line'
import Pie from 'pages/charts/Pie'
import ErrorPage from 'pages/404'

/* 调用模块：对象解构
---------------------------------------------------------------- */
const { Sider, Content } = Layout

/* 唯一的模块导出
---------------------------------------------------------------- */
function AdminLayout() {
  const user = storageUtils.getUser()

  // const [collapsed, setCollapsed] = useState(false)

  if (!user._id) return <Redirect to='/login' />
  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      <Layout>
        <Sider style={{ background: '#fff', width: 200, height: '100%' }}>
          <LeftNav />
        </Sider>
        <Content>
          <Switch>
            <Redirect from='/' exact to='/home' />
            <Route path='/home' component={Home} />
            <Route path='/category' component={Category} />
            <Route path='/product' component={Product} />
            <Route path='/user' component={User} />
            <Route path='/role' component={Role} />
            <Route path='/charts/bar' component={Bar} />
            <Route path='/charts/pie' component={Pie} />
            <Route path='/charts/line' component={Line} />
            <Route component={ErrorPage} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout

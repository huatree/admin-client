import Login from 'pages/login'
import AdminLayout from '../layout'
import NoFound from 'pages/404'
import Home from 'pages/home'
import Category from 'pages/category'
import Product from 'pages/product'
import User from 'pages/user'
import Role from 'pages/role'
import Bar from 'pages/charts/Bar'
import Line from 'pages/charts/Line'
import Pie from 'pages/charts/Pie'

const routes = [
  {
    path: '/login',
    component: Login,
    requiresAuth: false,
    exact: true
  },
  {
    path: '/',
    component: AdminLayout,
    requiresAuth: false,
    routes: [
      {
        path: '/home',
        component: Home,
        requiresAuth: true,
        pageTitle: '首页',
        breadcrumb: ['/home']
      },
      {
        path: '/products/category',
        component: Category,
        requiresAuth: true,
        pageTitle: '品类管理',
        breadcrumb: ['/products', '/products/category']
      },
      {
        path: '/products/product',
        component: Product,
        requiresAuth: true,
        pageTitle: '商品管理',
        breadcrumb: ['/products', '/products/product']
      },
      {
        path: '/user',
        component: User,
        requiresAuth: true,
        pageTitle: '用户管理',
        breadcrumb: ['/user']
      },
      {
        path: '/role',
        component: Role,
        requiresAuth: true,
        pageTitle: '角色管理',
        breadcrumb: ['/role']
      },
      {
        path: '/charts/bar',
        component: Bar,
        requiresAuth: true,
        pageTitle: '柱状图',
        breadcrumb: ['/charts', '/charts/bar']
      },
      {
        path: '/charts/line',
        component: Line,
        requiresAuth: true,
        pageTitle: '折线图',
        breadcrumb: ['/charts', '/charts/line']
      },
      {
        path: '/charts/pie',
        component: Pie,
        requiresAuth: true,
        pageTitle: '饼图',
        breadcrumb: ['/charts', '/charts/pie']
      },
      {
        path: '*',
        component: NoFound,
        requiresAuth: false
      }
    ]
  },
  {
    path: '*',
    component: NoFound,
    requiresAuth: false
  }
]

export default routes

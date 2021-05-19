/* 左侧导航 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { createFromIconfontCN } from '@ant-design/icons'

import * as storageUtils from 'utils/storageUtils'

/* 静态资源
---------------------------------------------------------------- */
import menuMap from '../../../config/menuMap'

const { SubMenu } = Menu

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 唯一的模块导出
---------------------------------------------------------------- */
function LeftNav(props) {
  const path = props.location.pathname

  const [defaultOpenKeys, setDefaultOpenKeys] = useState([])

  /**
   * 判断当前登录户对item是否有权限
   * @param {*} item
   * @returns
   */
  const hasAuth = item => {
    const { key } = item
    const user = storageUtils.getUser()
    const { menus } = user.role || {}

    // 当前用户有此item的权限: key有没有menus中
    if (menus && menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }

    return false
  }

  const menuNodes = menuMap => {
    return menuMap.map(item => {
      if (hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        } else {
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {menuNodes(item.children)}
            </SubMenu>
          )
        }
      }
      return null
    })
  }

  // 每次点击清除openkeys，关闭其他
  const onOpenChange = openKeys => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      setDefaultOpenKeys(openKeys)
      return
    }
    const latestOpenkey = openKeys[openKeys.length - 1]

    if (latestOpenkey.includes(openKeys[0])) {
      setDefaultOpenKeys([])
    } else {
      setDefaultOpenKeys([latestOpenkey])
    }
  }

  return (
    <div className='left-nav'>
      <Menu mode='inline' theme='light' selectedKeys={[path]} openKeys={defaultOpenKeys} onOpenChange={onOpenChange}>
        {menuNodes(menuMap)}
      </Menu>
    </div>
  )
}

export default withRouter(LeftNav)

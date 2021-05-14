/* 左侧导航 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { createFromIconfontCN } from '@ant-design/icons'

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

  const menuNodes = menuMap => {
    return menuMap.map(item => {
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

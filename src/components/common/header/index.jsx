/* 头部 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Button } from 'antd'
import { withRouter, Link } from 'react-router-dom'

/* 功能模块
---------------------------------------------------------------- */
import * as storageUtils from 'utils/storageUtils'

/* 静态资源
---------------------------------------------------------------- */
import './index.less'
import logo from 'assets/img/logo192.png'

/* 唯一的模块导出
---------------------------------------------------------------- */
function Header(props) {
  const user = storageUtils.getUser()

  /**
   * 退出登录
   */
  const onLogout = () => {
    storageUtils.removeUser()
    const { history } = props
    history.replace('/login')
  }

  return (
    <div className='header'>
      <Link className='header-logo' to='/'>
        <img src={logo} alt='' />
        <h1>Admin后台</h1>
      </Link>
      <div className='header-content'>
        <span>欢迎，{user.username}！</span>
        <Button style={{ color: '#fff' }} type='link' onClick={onLogout}>
          退出
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Header)

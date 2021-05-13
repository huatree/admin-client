/* 管理页面 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Redirect } from 'react-router-dom'

/* 功能模块
---------------------------------------------------------------- */
import * as storageUtils from 'utils/storageUtils'

/* 唯一的模块导出
---------------------------------------------------------------- */
function AdminLayout() {
  const user = storageUtils.getUser()
  console.log(storageUtils);
  if (!user._id) return <Redirect to='/login' />
  return (
    <div>
      <h2>后台管理</h2>
      <div>Hello {user.username}</div>
    </div>
  )
}

export default AdminLayout

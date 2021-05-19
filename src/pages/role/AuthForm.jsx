/* 设置角色权限 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Modal, Button, Tree } from 'antd'
import PropTypes from 'prop-types'

import menuList from '../../config/menuMap'

/* 使用类型检查
---------------------------------------------------------------- */
AuthForm.prototype = {
  visible: PropTypes.bool.isRequired,
  role: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdateRole: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function AuthForm(props) {
  const { visible, role, onCancel, onUpdateRole } = props

  const [checkedKeys, setCheckedKeys] = useState(role.menus) // 根据传入角色的menus生成初始状态

  const onOk = () => {
    onUpdateRole(checkedKeys)
    // setCheckedKeys([])
  }

  useEffect(() => {
    setCheckedKeys(role.menus)
  }, [role])

  return (
    <Modal
      title='设置角色权限'
      visible={visible}
      onCancel={() => {
        setCheckedKeys(role.menus)
        onCancel()
      }}
      onOk={onOk}
    >
      <label>角色名称:</label>
      <Button type='link'>{role.name}</Button>

      <Tree
        checkable
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        selectable={false}
        onCheck={checkedKeys => {
          setCheckedKeys(checkedKeys)
        }}
        treeData={[
          {
            title: '平台权限',
            key: 'all',
            children: menuList
          }
        ]}
      />
    </Modal>
  )
}

export default AuthForm

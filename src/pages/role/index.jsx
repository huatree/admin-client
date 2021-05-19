/* 角色管理 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card, Button, Table, message } from 'antd'
import { createFromIconfontCN, PlusOutlined, ToolOutlined } from '@ant-design/icons'

/* 子模块
---------------------------------------------------------------- */
import AddForm from './AddForm'
import AuthForm from './AuthForm'

/* 功能模块
---------------------------------------------------------------- */
import { reqRoles, reqAddRole, reqUpdateRole } from 'api'
import { PAGE_SIZE } from 'utils/constants'
import { formateDate } from 'utils/dateUtils'
import * as storageUtils from 'utils/storageUtils'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 唯一的模块导出
---------------------------------------------------------------- */
function Role(props) {
  const [isLoading, setIsLoading] = useState(false) // 是否正在获取数据中
  const [roles, setRoles] = useState([]) // 所有角色的列表
  const [role, setRole] = useState({}) // 所选中的角色
  const [isShowAdd, setIsShowAdd] = useState(false) // 是否显示添加界面
  const [isShowAuth, setIsShowAuth] = useState(false) // 是否显示设置权限界面

  const initColumns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: create_time => formateDate(create_time)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: auth_time => formateDate(auth_time)
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    }
  ]

  /**
   * 获取所有角色的列表
   */
  const getRoles = async () => {
    setIsLoading(true)
    try {
      const res = await reqRoles()
      if (res.status === 0) {
        setRoles(res.data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 选中一行
   * @param {*} role
   * @returns
   */
  const onRow = role => {
    return {
      onClick: () => {
        setRole(role)
      }
    }
  }

  /**
   * 创建角色
   * @param {*} values
   */
  const onAddRole = async values => {
    const res = await reqAddRole(values)
    if (res.status === 0) {
      setIsShowAdd(false)
      message.success('创建角色成功！')
      getRoles()
    } else {
      message.error('创建角色失败！')
    }
  }

  const onUpdateRole = async values => {
    const user = storageUtils.getUser()
    const updateRole = { ...role, menus: values, auth_time: Date.now(), auth_name: user.username }
    console.log(updateRole)
    const res = await reqUpdateRole(updateRole)
    if (res.status === 0) {
      setIsShowAuth(false)
      if (role._id === user._id) {
        message.success('当前用户角色权限成功！')
        storageUtils.removeUser()
        props.history.replace('/login')
      } else {
        message.success('设置角色权限成功')
        getRoles()
      }
    }
  }

  useEffect(() => {
    getRoles()

    return () => {
      setRoles(() => [])
    }
  }, [])

  return (
    <>
      <Card
        size='small'
        title={
          <>
            <Icon type='icon-security' />
            <span style={{ marginLeft: 10 }}>角色管理</span>
          </>
        }
        extra={
          <>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsShowAdd(true)}>
              创建角色
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              type='primary'
              icon={<ToolOutlined />}
              disabled={!role._id}
              onClick={() => setIsShowAuth(true)}
            >
              设置角色权限
            </Button>
          </>
        }
      >
        <Table
          bordered
          scroll={{ y: 450 }}
          rowKey='_id'
          loading={isLoading}
          columns={initColumns}
          dataSource={roles}
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: role => {
              setRole(role)
            }
          }}
          onRow={onRow}
        />
      </Card>

      <AddForm
        visible={isShowAdd}
        onCancel={form => {
          form.resetFields()
          setIsShowAdd(false)
        }}
        onAddRole={onAddRole}
      />
      <AuthForm visible={isShowAuth} role={role} onCancel={() => setIsShowAuth(false)} onUpdateRole={onUpdateRole} />
    </>
  )
}

export default Role

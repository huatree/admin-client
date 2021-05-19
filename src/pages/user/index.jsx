/* 用户管理 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons'

/* 子模块
---------------------------------------------------------------- */
import UserForm from './UserForm'

/* 功能模块
---------------------------------------------------------------- */
import { reqUsers, reqAddUser, reqUpdateUser, reqDeleteUser } from 'api'
import { PAGE_SIZE } from 'utils/constants'
import { formateDate } from 'utils/dateUtils'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 唯一的模块导出
---------------------------------------------------------------- */
function User() {
  const [isLoading, setIsLoading] = useState(false) // 是否数据加载中
  const [users, setUsers] = useState([]) // 所有用户列表
  const [roles, setRoles] = useState([]) // 所有角色列表
  const [action, setAction] = useState({ type: '', data: {} }) // 操作类型

  const initColumns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },

    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: formateDate
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: role_id => initRoleNames(roles, role_id)
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: user => (
        <span>
          <Button type='link' onClick={() => onShowAction('up', user)}>
            更新
          </Button>
          <Button type='link' onClick={() => onDeleteUser(user)}>
            删除
          </Button>
        </span>
      )
    }
  ]

  /**
   * 根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
   * @param {*} roles
   * @param {*} roleId
   * @returns
   */
  const initRoleNames = (roles, roleId) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    return roleNames[roleId]
  }

  /**
   * 获取所有用户
   */
  const getUsers = async () => {
    setIsLoading(true)
    try {
      const res = await reqUsers()
      if (res.status === 0) {
        setUsers(res.data.users)
        setRoles(res.data.roles)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onShowAction = (type, data = {}) => {
    setAction({ type, data })
  }

  const onCancel = form => {
    if (action.type === 'add') {
      form.resetFields()
    }
    setAction({ ...action, type: '' })
  }

  /**
   * 新增/更新用户
   * @param {*} form 
   * @param {*} values 
   */
  const onAddOrUpdateUser = async (form, values) => {
    const { type, data } = action
    let res = {}
    switch (type) {
      case 'add':
        res = await reqAddUser(values)
        if (res.status === 0) {
          message.success('新增用户成功！')
          form.resetFields()
          setAction({ ...action, type: '' })
          getUsers()
        } else {
          message.error('新增用户失败！')
        }
        break
      case 'up':
        res = await reqUpdateUser({ _id: data._id, ...values })
        if (res.status === 0) {
          message.success('更新用户成功！')
          setAction({ ...action, type: '' })
          getUsers()
        } else {
          message.error('更新用户失败！')
        }
        break

      default:
        break
    }
  }

  /**
   * 删除用户
   */
  const onDeleteUser = user => {
    const { _id, username } = user
    Modal.confirm({
      title: '信息',
      content: (
        <span>
          确认要删除<b style={{ color: 'red' }}>{username}</b>用户吗？
        </span>
      ),
      async onOk() {
        const res = await reqDeleteUser({ _id })
        if (res.status === 0) {
          message.success('删除用户成功！')
          getUsers()
        }
      }
    })
  }

  useEffect(() => {
    getUsers()

    return () => {
      setUsers(() => [])
      setRoles(() => [])
    }
  }, [])

  return (
    <>
      <Card
        size='small'
        title={
          <>
            <Icon type='icon-user' />
            <span style={{ marginLeft: 10 }}>用户管理</span>
          </>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => onShowAction('add')}>
            新增
          </Button>
        }
      >
        <Table
          bordered
          rowKey='_id'
          loading={isLoading}
          columns={initColumns}
          dataSource={users}
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        />
      </Card>

      <UserForm action={action} roles={roles} onCancel={onCancel} onAddOrUpdate={onAddOrUpdateUser} />
    </>
  )
}

export default User
